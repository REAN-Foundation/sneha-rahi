<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import type { PageServerData } from './$types';
    import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageServerData;
	let myLearningJourneys = data.userLearningPaths?.UserLearningPaths;
	let allLearningJourneys = data.allLearningPaths?.LearningPaths.Items;


	// allLearningJourneys = allLearningJourneys.sort((a, b) => { return a.Name - b.Name; });
	// let allCourses = data.allCourseContents?.CourseContents?.Items;
	// allCourses = allCourses.sort((a, b) => {
	// 	return a.Sequence - b.Sequence;
	// });
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

    function showToast() {
        toast.error("Please follow the sequence!");
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      showToast();
    }
  }
</script>

<!-- <div class="card card-compact w-[375px] h-[701px] card-bordered border-slate-200  bg-base-100  rounded-none rounded-t-[44px] shadow-sm "> -->
<div class="card-body h-[500px]">
	<!-- <button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 rounded" /> -->
	<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
		MY LEARNING
	</h2>

		{#if allLearningJourneys.length === 0 }
			<h3 class="mb-3 mt-1 font-semibold text-center">
				You have not yet started learning journey!
			</h3>
		{:else}
		<div class="overflow-auto scrollbar-medium min-h-[600px] max-h-[650px]">
			{#each allLearningJourneys as learningJourney}
                {#if !learningJourney.Disabled}
                    <a href={`/users/${data.userId}/learning-journeys/${learningJourney.id}`}>
                        <div class="flex flex-row">
                            <Image
                                cls="mb-2 rounded-md"
                                source={learningJourney.ImageUrl + '?disposition=inline'}
                                w="80"
                                h="80"
                            />
                            <!-- <img class="mb-2 " src="/assets/learning-home/svg/about-anaemia.svg" alt="" /> -->
                            <div class="mx-2 w-[250px] max-[425px]:w-full">
                                <!-- <h3 class="mb-5 mt-1">{learningJourney.Name}</h3> -->
                                <h3 class="mb-5 mt-5 font-semibold text-center tracking-normal text-ellipsis">
									{learningJourney.Name.length > 20 ? learningJourney.Name.substring(0, 18) + '...' : learningJourney.Name}
								</h3>
                                <div class="bg-[#c5e8c5] rounded-full h-[10px]">
                                    <div
                                        class="bg-[#70ae6e] rounded-full h-[10px]"
                                        style={'width:' + (learningJourney.PercentageCompletion * 100).toString() + '%'}
                                    />
                                </div>
                            </div>
                            <div class="mt-7 font-bold">
                                {(learningJourney.PercentageCompletion * 100).toFixed().toString()}%
                            </div>
                        </div>
                    </a>
                {:else}
                    <div on:click={showToast} on:keydown={handleKeyPress} class="flex flex-row">
                        <Image
                            cls="mb-2 rounded-md"
                            source={learningJourney.ImageUrl + '?disposition=inline'}
                            w="80"
                            h="80"
                        />
                        <!-- <img class="mb-2 " src="/assets/learning-home/svg/about-anaemia.svg" alt="" /> -->
                        <div class="mx-2 w-[250px] max-[425px]:w-full">
                            <h3 class="mb-5 mt-3">{learningJourney.Name}</h3>
                            <div class=" bg-[#c5e8c5] rounded-full h-[10px]">
                                <div
                                    class="bg-[#70ae6e] rounded-full h-[10px]"
                                    style={'width:' + (learningJourney.PercentageCompletion * 100).toString() + '%'}
                                />
                            </div>
                        </div>
                        <div class="mt-7 font-bold">
                            {(learningJourney.PercentageCompletion * 100).toFixed().toString()}%
                        </div>
                    </div>
                {/if}
			{/each}
		</div>
	{/if}
</div>
<!-- </div> -->
