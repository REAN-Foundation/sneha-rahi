<script lang="ts">
	import Image from "$lib/components/image.svelte";
	import type { PageServerData } from "./$types";
	import { selectedLanguage } from '$lib/store/general.store';
	import english from '$lib/localization/english.json';
  import hinglish from '$lib/localization/hinglish.json'

	/////////////////////////////////////////////////////////////////////////

	let localizedContent = $selectedLanguage === 'hinglish' ? hinglish : english;
	export let data: PageServerData;
	let allLearningJourneys = data.allLearningPaths.LearningPaths.Items;
	allLearningJourneys = allLearningJourneys.sort((a, b) => { return b.PreferenceWeight - a.PreferenceWeight; });

</script>

<!-- <div class="card card-compact card-bordered border-slate-200 w-[375px] h-[701px] bg-base-100 rounded-none rounded-t-[44px] shadow-sm"> -->
	<div class="card-body ">
		<!-- <button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 rounded" /> -->
		<h2 class=" text-[#5b7aa3] flex  justify-center font-bold text-base tracking-widest ">
			LEARNING JOURNEYS
		</h2>
		<h2 class="text-xl font-semibold text-center mb-2">{localizedContent.LearningJourneyDescription}</h2>
		<div class="overflow-auto scrollbar-medium h-[560px]">
			<div class="columns-2 flex-wrap space-around justify-center mb-6">
				{#each allLearningJourneys as learningJourney}
					<a href={`/users/${data.userId}/learning-journeys/${learningJourney.id}`}>
						<div class=" flex-col space-around justify-center mb-6 ">
							<!-- <img class="mb-2 " src="/assets/learning-journeys/svg/growing-up.svg" alt="" /> -->
							<Image cls="mt-3 mb-4 mr-1 rounded" source={learningJourney.ImageUrl + "?disposition=inline"} w=162 h=162 />
							<p class="font-semibold text-center overflow-hidden text-ellipsis">{learningJourney.Name.length > 20 ? learningJourney.Name.substring(0, 18) + '...': learningJourney.Name}
						</div>
					</a>
				{/each}
				<!-- <div class="flex flex-col justify-center mb-4">
					<img class=" mb-2 " src="/assets/learning-journeys/svg/child-abuse.svg" alt="" />
					<h3 class="text-center">Child Sexual Abuse</h3>
				</div>

				<div class="flex flex-col justify-center mb-4">
					<img class=" mb-2 " src="/assets/learning-journeys/svg/eat-healthy.svg" alt="" />
					<h3 class="text-center">Why should I eat healthy?</h3>
				</div>
				<div class="flex flex-col justify-center mb-4">
					<img class=" " src="/assets/learning-journeys/svg/sexual-reproductive.svg" alt="" />
					<h3 class="text-center">Sexual & Reproductive Health & Hygiene</h3>
				</div>
				<div class="flex flex-col justify-center mb-7">
					<img class=" mb-3 " src="/assets/learning-journeys/svg/substance-abuse.svg" alt="" />
					<h3 class="text-center">Substance Abuse</h3>
				</div>
				<div class="flex flex-col justify-center mb-4">
					<img class=" mb-2 " src="/assets/learning-journeys/svg/domestic-violence.svg" alt="" />
					<h3 class="text-center">Domestic Violence</h3>
				</div>
				<div class="flex flex-col justify-center mb-4">
					<img class=" mb-2 " src="/assets/learning-journeys/svg/gender-identity.svg" alt="" />
					<h3 class="text-center">Sex, Gender & Identity</h3>
				</div>
				<div class="flex flex-col justify-center mb-4">
					<img class=" mb-2 " src="/assets/learning-journeys/svg/feeling.svg" alt="" />
					<h3 class="text-center">Why do I feel the way I feel?</h3>
				</div> -->
			</div>
		</div>
	</div>
<!-- </div> -->
