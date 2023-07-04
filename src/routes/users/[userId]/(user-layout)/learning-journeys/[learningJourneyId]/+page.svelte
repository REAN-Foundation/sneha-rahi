<script lang="ts">
	import type { PageServerData } from './$types';
	import Image from '$lib/components/image.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { showMessage } from '$lib/utils/message.utils';
	import { slide } from 'svelte/transition';
	import Youtube from '$lib/components/youtube-embed/youtube.svelte';
	export let data: PageServerData;
	import { fade, fly } from 'svelte/transition';
	let learningJourney = data.learningPath;
	let courseContents = data.courseContentsForLearningPath;
	courseContents = courseContents.sort((a, b) => {
		return a.Sequence - b.Sequence;
	});
	const userId = data.userId;
	const learningJourneyId = $page.params.learningJourneyId;
	console.log(`${JSON.stringify(courseContents, null, 2)}`);

	courseContents = courseContents.map((x) => {
		return {
			...x,
			showVedio: false
		};
	});

	function getYouTubeId(url) {
		let id = '';
		url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
		if (url[2] !== undefined) {
			id = url[2].split(/[^0-9a-z_\-]/i);
			id = id[0];
		} else {
			id = url;
		}
		return id;
	}

	async function updateVideoProgress(model) {
		await fetch(`/api/server/learning`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	async function takeQuiz(model) {
		return await fetch(`/api/server/quiz/take-quiz`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	const handleCourseContentClick = async (
		e,
		resourceLink: string,
		contentType: string,
		actionTemplateId?: string
	) => {
		console.log(e.currentTarget);
		const contentId = e.currentTarget.id;
		console.log(`contentId = ${contentId}`);

		if (contentType === 'Video') {
			const videoModel = {
				sessionId: data.sessionId,
				userId: data.userId,
				contentId
			};
			await updateVideoProgress(videoModel);
			//TODO: Please use video embedding rather than switching to different page
			// window.location.href = resourceLink;
		} else if (contentType === 'Assessment') {
			const quizModel = {
				sessionId: data.sessionId,
				userId: data.userId,
				assessmentTemplateId: actionTemplateId,
				courseContentId: contentId,
				learningJourneyId: $page.params.learningJourneyId,
				scheduledDate: new Date()
			};
			const response = await takeQuiz(quizModel);
			const text = await response.text();
			const resp = JSON.parse(text);
			console.log(resp.action);
			console.log(resp.content);
			if (resp.action === 'message') {
				showMessage(resp.content, 'info', true, 3500);
			} else if (resp.action == 'redirect') {
				goto(resp.content);
			} else {
				showMessage(resp.content, 'error', true, 3500);
			}
		} else {
			const errmsg = `Content type is not yet handled!`;
			showMessage(errmsg, 'error', true, 3500);
			console.log(errmsg);
		}
	};

	const handleCourseCloseClick = async () => {
		await courseContents
		window.location.href = `/users/${userId}/learning-journeys/${learningJourneyId}`
	};
</script>

<!-- <div
	class="card card-compact w-[375px] h-[280px] card-bordered border-slate-200 bg-[#ffdbb2]  rounded-none rounded-t-[44px] shadow-sm"
> -->
<div
	class="card h-[280px] w-[375px] max-[425px]:w-full max-[425px]:border-none border-x border-slate-200 "
>
	<!-- <div class="flex flex-col text-center justify-center"> -->
	<!-- <button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 rounded" /> -->
	<!-- <img
				class="h-[310px] w-[308px]"
				src="/assets/learning-course/svg/growing-up-affect.svg"
				alt=""
			/> -->
	<div class=" flex justify-center mt-2">
		<Image cls="" source={learningJourney?.ImageUrl} w="200" h="180" />
	</div>
	<!-- </div> -->
</div>
<!-- </div> -->
<div
	class=" card-body h-[421px] bg-white border-slate-200 border-x border-b max-[425px]:border-none"
>
	<h2 class="leading-4 text-lg mb-2">{learningJourney.Name}</h2>
	<p class="h-auto">
		{learningJourney.Description ? learningJourney.Description : ''}
	</p>
	<!-- <div class="overflow-auto scrollbar-medium h-[280px]">
		{#each couseContents as course}
			<div class="grid  grid-flow-col mb-3">
				<div class="h-16 w-16  bg-[#ffdbb2] rounded-lg ">
					<img class=" m-4 " src="/assets/learning-course/svg/slides.svg" alt="" />
				</div>
				<div class="mx-2">
					<h3 class="text-left  mb-1">Course{course.Sequence}</h3>
					<p class="mb-3">{course.Title}</p>
					<div class=" bg-[#ffdbb2] rounded-full h-[10px] w-[211px]">
						<div class="bg-[#fcaf58] rounded-full h-[10px]" style="width:25%" />
					</div>
				</div>
				<div class="mt-9 font-bold">25%</div>
			</div>
		{/each}
	</div> -->

	<div class="overflow-auto scrollbar-medium h-[350px]">
		{#if courseContents.length == 0}
			<h3 class="mb-3 mt-1 font-semibold text-start">
				Course is not available yet. Please stay tuned.
			</h3>
		{:else}
			{#each courseContents as content}
				<button
					on:click|capture={async (e) => {
						content.showVedio = true;
						await handleCourseContentClick(
							e,
							content.ResourceLink,
							content.ContentType,
							content.ActionTemplateId
						);
					}}
					id={content.id}
					name={content.id}
					class="leading-4 tracking-normal font-bold w-[375px] max-[425px]:w-full"
				>
					<div class="flex flex-grow-col mb-4">
						{#if content.ContentType == 'Video'}
							{#if content.showVedio}
								<!-- <div class="h-16 w-16 bg-[#e3e3e3] rounded-lg ">
							<img class=" m-5 " src="/assets/images/learning-course/svg/video.svg" alt="" />
						</div> -->
								<!-- <div class="" in:fly="{{ x: 100, duration: 3000 }}" out:fly = {{ x: 100, duration: 1000 }}> -->
								<div class="" transition:slide={{ duration: 1000 }}>
									<div class="mx-4 grid grid-flow-row">
										<h3 class="text-center mb-3 w-full">{content.Title}</h3>
										<!-- svelte-ignore a11y-media-has-caption -->
										<!-- <div>  -->
										<Youtube
											id={getYouTubeId(content.ResourceLink)}
											on:closeVideo={handleCourseCloseClick}
										>
											<!-- <button /> -->
										</Youtube>
										<!-- </div>	 -->
									</div>
								</div>
							{:else}
							<div class="flex items-center h-16 w-16">
								<div class="h-16 w-16 bg-[#e3e3e3] rounded-lg">
									<img class="m-5" src="/assets/images/learning-course/svg/video.svg" alt="" />
								</div>
							</div>
								<div class="mx-4 w-[211px] max-[425px]:w-full">
									<h3 class="text-left mb-3">{content.Title}</h3>

									<div class="bg-[#e3e3e3] mt-3 rounded-full h-[10px] w-[211px] max-[425px]:w-full">
										<div
											class="bg-[#70ae6e] rounded-full h-[10px]"
											style={'width:' +
												`${
													content.PercentageCompletion
														? content?.PercentageCompletion?.toString()
														: '0'
												}` +
												'%'}
										/>
									</div>
								</div>
							{/if}
						{:else if content.ContentType === 'Assessment'}
						<div class="flex items-center h-16 w-16">
							<div class="h-16 w-16 bg-[#e3e3e3] rounded-lg ">
								<img class="m-4" src="/assets/images/learning-course/svg/quiz.svg" alt="" />
							</div>
						</div>
							<div class="mx-4 w-[211px] max-[425px]:w-full">
								<h3 class="text-left mb-5">{content.Title}</h3>
								<div class="bg-[#e3e3e3]  rounded-full h-[10px] w-[211px] max-[425px]:w-full">
									<div
										class="bg-[#70ae6e] rounded-full h-[10px]"
										style={'width:' +
											`${
												content.PercentageCompletion
													? content?.PercentageCompletion?.toString()
													: '0'
											}` +
											'%'}
									/>
								</div>
							</div>
							<!-- </div> -->
						{:else}
						<div class="flex items-center h-16 w-16">
							<div class="h-16 w-16 bg-[#e3e3e3] rounded-lg ">
								<img class="m-4" src="/assets/images/learning-course/svg/slides.svg" alt="" />
							</div>
						</div>
							<div class="mx-4 w-[211px] max-[425px]:w-full">
								<h3 class="text-left mb-5">{content.Title}</h3>
								<div class="bg-[#e3e3e3] rounded-full h-[10px] w-[211px] max-[425px]:w-full">
									<div
										class="bg-[#70ae6e] rounded-full h-[10px]"
										style={'width:' +
											`${
												content.PercentageCompletion
													? content?.PercentageCompletion?.toString()
													: '0'
											}` +
											'%'}
									/>
								</div>
							</div>
						{/if}
						<!-- <div class="mx-4">
							<h3 class="text-left mb-5">{content.Title}</h3>
							<div class="bg-[#e3e3e3]  rounded-full h-[10px] w-[211px]">
								<div class="bg-[#70ae6e] rounded-full h-[10px]" style={"width:" + `${content.PercentageCompletion ? content?.PercentageCompletion?.toString() : '0'}` + "%"}/>
							</div>
						</div>
						<div class="mt-9 font-bold" /> -->
					</div>
				</button>
			{/each}
		{/if}
	</div>

	<!-- <div class="grid  grid-flow-col mb-3">
		<div class="h-16 w-16  bg-[#e3e3e3] rounded-lg ">
			<img class=" m-4 " src="/assets/learning-course/svg/slides.svg" alt="" />
		</div>
		<div class="mx-2">
			<h3 class="text-left  mb-1">Module 02</h3>
			<p class="mb-3">Being Adolescence</p>
			<div class=" bg-[#e3e3e3] rounded-full h-[10px] w-[211px]">
				<div class="bg-[#a5a5a5] rounded-full h-[10px]" style="width:0%" />
			</div>
		</div>
		<div class="mt-9 font-bold">0%</div>
	</div>
	<div class="grid  grid-flow-col mb-3">
		<div class="h-16 w-16  bg-[#e3e3e3] rounded-lg ">
			<img class=" m-5 " src="/assets/learning-course/svg/video.svg" alt="" />
		</div>
		<div class="mx-2">
			<h3 class="text-left  mb-1">Module 03</h3>
			<p class="mb-3">Being a youth</p>
			<div class=" bg-[#e3e3e3] rounded-full h-[10px] w-[211px]">
				<div class="bg-[#a5a5a5] rounded-full h-[10px]" style="width:0%" />
			</div>
		</div>
		<div class="mt-9 font-bold">0%</div>
	</div>
	<div class="grid  grid-flow-col mb-3">
		<div class="h-16 w-16  bg-[#e3e3e3] rounded-lg ">
			<img class=" m-4 " src="/assets/learning-course/svg/module.svg" alt="" />
		</div>
		<div class="mx-2">
			<h3 class="text-left  mb-1">Module 04</h3>
			<p class="mb-3 leading-4">Adolescents & youth as..</p>
			<div class=" bg-[#e3e3e3] rounded-full h-[10px] w-[211px]">
				<div class="bg-[#a5a5a5] rounded-full h-[10px]" style="width:0%" />
			</div>
		</div>
		<div class="mt-9 font-bold">0%</div>
	</div>
	<div class="grid  grid-flow-col mb-7">
		<div class="h-16 w-16  bg-[#e3e3e3] rounded-lg ">
			<img class="m-4" src="/assets/learning-course/svg/quiz.svg" alt="" />
		</div>
		<div class="mx-2">
			<h3 class="text-left mt-1  mb-7">Quiz</h3>

			<div class=" bg-[#e3e3e3] rounded-full h-[10px] w-[211px]">
				<div class="bg-[#a5a5a5] rounded-full h-[10px]" style="width:0%" />
			</div>
		</div>
		<div class="mt-9 font-bold">0%</div>
	</div> -->

	<button class="text-center mt-3">
		<a href="/users/{userId}/my-learnings"> BACK TO JOURNEY </a>
	</button>
</div>
