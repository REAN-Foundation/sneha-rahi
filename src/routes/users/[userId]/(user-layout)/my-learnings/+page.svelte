<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let myLearningJourneys = data.userLearningPaths?.UserLearningPaths;
	let allLearningJourneys = data.allLearningPaths?.LearningPaths.Items;
	// allLearningJourneys = allLearningJourneys.sort((a, b) => { return a.Name - b.Name; });
	let allCourses = data.allCourseContents?.CourseContents?.Items;
	allCourses = allCourses.sort((a, b) => {
		return a.Sequence - b.Sequence;
	});
	allLearningJourneys = allLearningJourneys.sort((a, b) => {
		return b.PreferenceWeight - a.PreferenceWeight;
	});

	//console.log(`\nMy learning journeys = ${JSON.stringify(myLearningJourneys)}`)
	//console.log(`\nAll learning paths = ${JSON.stringify(allLearningJourneys)}`)
	//console.log(`\nAll course contents = ${JSON.stringify(allCourses)}`)

	const handleCourseClick = async (e, resourceLink) => {
		console.log(e.currentTarget);
		const contentId = e.currentTarget.id;
		console.log(`contentId = ${contentId}`);
		await update({
			sessionId: data.sessionId,
			userId: data.userId,
			contentId
		});
		window.location.href = resourceLink;
	};

	async function update(model) {
		const response = await fetch(`/api/server/learning`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
	}
</script>

<!-- <div class="card card-compact w-[375px] h-[701px] card-bordered border-slate-200  bg-base-100  rounded-none rounded-t-[44px] shadow-sm "> -->
<div class="card-body h-[500px]">
	<!-- <button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 rounded" /> -->
	<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
		MY LEARNING
	</h2>
	<div class="overflow-auto scrollbar-medium h-[200px]">
		{#if myLearningJourneys.length == 0}
			<h3 class="mb-3 mt-1 font-semibold text-center">
				You have not yet started learning journey!
			</h3>
		{:else}
			{#each myLearningJourneys as journey}
				<div class="flex flex-row">
					<Image
						cls="mb-2 rounded-md"
						source={journey.ImageUrl + '?disposition=inline'}
						w="40"
						h="40"
					/>
					<!-- <img class="mb-2 " src="/assets/learning-home/svg/about-anaemia.svg" alt="" /> -->
					<div class="mx-2">
						<h3 class="mb-4 mt-1">{journey.Name}</h3>
						<div class=" bg-[#c5e8c5] rounded-full h-[10px] w-[230px]">
							<div
								class="bg-[#70ae6e] rounded-full h-[10px]"
								style={'width:' + (journey.PercentageCompletion * 100).toString() + '%'}
							/>
						</div>
					</div>
					<div class="mt-7 font-bold">
						{(journey.PercentageCompletion * 100).toFixed().toString()}%
					</div>
				</div>
				<!-- <div class="flex flex-row">
				<img class="mb-2 " src="/assets/learning-home/svg/about-female-health.svg" alt="" />
				<div class="mx-2">
					<h3 class="mb-3 mt-1">Female reproductive health</h3>
					<div class=" bg-[#c5e8c5] rounded-full h-[10px] w-[230px]">
						<div class="bg-[#70ae6e] rounded-full h-[10px]" style="width:15%" />
					</div>
				</div>
				<div class="mt-6 font-bold">15%</div>
			</div> -->
			{/each}
		{/if}
	</div>
	<div>
		<div class="flex mb-4 relative">
			<h2 class="text-xl ">Learning Journeys</h2>
			<a href={`/users/${data.userId}/learning-journeys`}>
				<button class="text-[#d05591] text-base absolute right-0 pr-3">VIEW ALL</button>
			</a>
		</div>
		<div class="overflow-x-scroll w-[340px]">
			<div class="grid grid-flow-col auto-cols-max">
				<!-- <div class=" flex-col justify-center  mb-4 ">
						<img class="mb-3 mr-4" src="/assets/learning-home/svg/substance-abuse.svg" alt="" />
						<h3>Substance Abuse</h3>
					</div>
					<div class="grid grid-row-2 justify-center  mb-4">
						<img class=" mb-2 mr-4" src="/assets/learning-home/svg/growing-up.svg" alt="" />
						<h3>Growing Up:I’m all <br /> grown up!</h3>
					</div>
					<div class=" flex-col justify-center  mb-4">
						<img class=" mb-2 mr-4" src="/assets/learning-home/svg/child-abuse.svg" alt="" />
						<h3 class="text-center">Child Sexual Abuse</h3>
					</div> -->
				{#each allLearningJourneys as learningJourney}
					<div id={learningJourney.id} class="flex-col justify-center mb-4 mr-4">
						<a href={`/users/${data.userId}/learning-journeys/${learningJourney.id}`}>
							<Image
								cls="mb-3 mr-1"
								source={learningJourney.ImageUrl + '?disposition=inline'}
								w="110"
								h="132"
							/>
							<p class="font-semibold text-center overflow-hidden text-ellipsis">
								{learningJourney.Name.length > 15
									? learningJourney.Name.substring(0, 13) + '...'
									: learningJourney.Name}
							</p>
						</a>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="mt-1">
		<div class="flex mb-4 relative">
			<h2 class="text-xl ">Courses</h2>
			<!-- <a href={`/users/${data.userId}/learning-journeys`}>
					<button class=" text-[#d05591] text-base absolute right-0 pr-3">VIEW ALL</button>
				</a> -->
		</div>
		<div class="overflow-auto scrollbar-medium h-[200px]">
			<div class="columns-2 flex-wrap ">
				{#each allCourses as course}
					<button
						on:click|capture={(e) => handleCourseClick(e, course.ResourceLink)}
						id={course.id}
						name={course.id}
					>
						{#if course.ContentType == 'Assessment'}
							<div />
						{:else}
							<div class=" flex-col justify-center mb-6 ">
								{#if course.ImageUrl == null}
									<img
										class="mb-4 w-[162px] h-[162px] "
										src="/assets/images/learning-home/svg/growing-up-affect.svg"
										alt=""
									/>
								{:else}
									<Image
										cls="mt-2 mb-3 mr-1 rounded"
										source={course.ImageUrl + '?disposition=inline'}
										w="162"
										h="162"
									/>
								{/if}
								<h3 class="font-semibold text-center tracking-normal text-ellipsis">
									{course.Title.length > 20 ? course.Title.substring(0, 18) + '...' : course.Title}
								</h3>
							</div>
						{/if}
					</button>
				{/each}
				<!-- <a href="/course-home">
						<div class=" flex-col justify-center mb-6 ">
							<img
								class="mb-4 w-[162px] h-[162px] "
								src="/assets/learning-home/svg/growing-up-affect.svg"
								alt=""
							/>
							<h3 class="text-center">How does growing up affect me?</h3>
						</div>
					</a>
					<div class=" flex-col justify-center mb-6">
						<img class=" mb-4 " src="/assets/learning-home/svg/anaemia.svg" alt="" />
						<h3 class="text-center">All about Anaemia</h3>
					</div>
					<div class=" flex-col justify-center mb-6">
						<img class=" mb-4 " src="/assets/learning-home/svg/emotions.svg" alt="" />
						<h3 class="text-center">Understanding my Emotions</h3>
					</div>
					<div class=" flex-col justify-center mb-6">
						<img
							class=" mb-4 "
							src="/assets/learning-home/svg/female-reproductive-health.svg"
							alt=""
						/>
						<h3 class="text-center">Female reproductive health</h3>
					</div> -->
			</div>
		</div>
	</div>
</div>
<!-- </div> -->
