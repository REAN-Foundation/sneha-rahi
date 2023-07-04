<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let myLearningJourneys = data.userLearningPaths?.UserLearningPaths;
	let sum = 0;
	let count = 0;
	let overallProgress;
	let userId = data.user.User.id;
	let profileImageUrl = data.user.ProfileImageUrl ?? undefined;
	let addresses = data.user.User.Person.Addresses;
	let location = 'Mumbai';

	if (addresses.length > 0) {
		let address = addresses[0];
		location = address.AddressLine ?? address.City;
	}
	let FullName =
		data.user.User.Person.FirstName && data.user.User.Person.LastName
			? data.user.User.Person.FirstName + ' ' + data.user.User.Person.LastName
			: null;
	let Age = data.user.User.Person.Age;
	console.log('Age', Age);
	for (let item of myLearningJourneys) {
		if (item.PercentageCompletion != 0 && item.PercentageCompletion != undefined) {
			sum = sum + item.PercentageCompletion;
			count = count + 1;
		}
		overallProgress = (+sum / count).toFixed(2);
		console.log(overallProgress);
	}

	console.log(`\nUser Information = ${JSON.stringify(data.user)}`);
	console.log('\nOverall progress is =', overallProgress);
	console.log(`\nMy learning journeys = ${JSON.stringify(myLearningJourneys)}`);

	$: avatarSource = profileImageUrl;

</script>

<!-- <div class="card card-compact card-bordered border-slate-200 w-[375px] h-[701px]  bg-base-100  rounded-none rounded-t-[44px] shadow-sm"> -->
<div class="card-body ">
	<!-- <button class="h-[5px] w-[73px] bg-[#e3e3e3] ml-[8.5rem] mt-2 rounded" /> -->
	<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
		MY PROFILE
	</h2>
	<div class="flex flex-row ">
		<div class="grid grid-flow-col">
			{#if avatarSource}
				<Image cls="flex rounded-full" source={avatarSource} w="72" h="72" />
				<!-- <img class="flex h-24 w-24 rounded-full" src={avatarSource} alt="d" /> -->
			{:else}
				<img src="/assets/images/my-profile/png/my-profile-pic.png" alt="" />
			{/if}
			<div class="flex flex-col ml-6  ">
				<h3 class="text-left mt-2 ml-[2px] mb-2 font-bold">{FullName}</h3>
				<a href="/users/{userId}/edit-profile">
					<button class="uppercase text-base font-bold text-[#d05591] absolute right-5 mt-2">
						EDIT
					</button>
				</a>
				<p class=" text-left ">{Age} ,<br /> {location}</p>
			</div>
		</div>
	</div>
	<h2 class="flex  justify-left font-bold mt-2">My Progress</h2>
	{#if myLearningJourneys.length == 0}
		<h3 class="mb-3 mt-3 font-semibold text-center">You have not yet started learning journey!</h3>
	{:else}
		<div class="flex flex-rows max-[425px]:w-full w-[340px]">
			<div class=" bg-[#dfe7fd] mt-2  rounded-full max-[425px]:w-full w-[340px] h-[10px]">
				<div
					class="bg-[#5b7aa3] rounded-full h-[10px]"
					style={'width:' + (overallProgress * 100).toString() + '%'}
				/>
			</div>
			<div class=" ml-4 ">{(overallProgress * 100).toFixed().toString()}%</div>
		</div>
		
	{/if}
	<div class="overflow-auto scrollbar-medium w-[350px] max-[425px]:w-full">
		<div class="grid grid-flow-col auto-cols-max gap-3 mt-4">
			<h3 class="text-center mt-2">Ongoing <br /> Courses</h3>
			{#if myLearningJourneys.length == 0}
				<h3 class=" mt-3 font-semibold text-center">
					No ongoing courses.<br />Please learning journey!
				</h3>
			{:else}
				{#each myLearningJourneys as journey}
					<Image
						cls="mb-2 rounded-md"
						source={journey.ImageUrl + '?disposition=inline'}
						w="52"
						h="52"
					/>
					<!-- <img src="/assets/my-profile/png/virus-1.png" alt="" />
					<img src="/assets/my-profile/png/virus-2.png" alt="" />
					<img src="/assets/my-profile/png/rectangle-1.png" alt="" />
					<img src="/assets/my-profile/png/rectangle-1.png" alt="" />
					<img src="/assets/my-profile/png/rectangle-1.png" alt="" />
					<img src="/assets/my-profile/png/rectangle-1.png" alt="" /> -->
				{/each}
			{/if}
		</div>
	</div>

	<div class="grid grid-flow-col mt-1">
		<h2 class="  justify-left  ">My Badges</h2>
		<button class="uppercase text-base text-[#d05591] mt-[6px] text-right">view all</button>
	</div>

	<div class="grid grid-flow-col mt-2 gap-4 overflow-auto scrollbar-medium w-[350px] max-[425px]:w-full">
		<div class="grid grid-flow-row">
			<div class="w-[99px] h-[99px] rounded bg-[#fcaf58]">
				<img
					src="/assets/images/my-profile/png/star-member.png"
					alt=""
					class="object-contain my-6 mx-9"
				/>
			</div>
			<h3 class=" mt-1">Star Member</h3>
		</div>
		<div class="grid grid-flow-row">
			<div class="w-[99px] h-[99px] rounded bg-[#5b7aa3]">
				<img
					src="/assets/images/my-profile/png/champion-medal.png"
					alt=""
					class="object-contain my-7 mx-6"
				/>
			</div>
			<h3 class="mt-1">Community <br /> Champion</h3>
		</div>
		<div class="grid grid-flow-row">
			<div class="w-[99px] h-[99px] rounded bg-[#70ae6e]">
				<img
					src="/assets/images/my-profile/png/percentage-meter.png"
					alt=""
					class="object-contain my-7 mx-6"
				/>
			</div>
			<h3 class="mt-1">99 Percenter</h3>
		</div>
	</div>

	<div class="grid grid-flow-col mt-2">
		<h2 class=" justify-left ">My Certificates</h2>
		<button class="uppercase text-base text-[#d05591] mt-[6px] text-right">view all</button>
	</div>
	<div class="overflow-auto scrollbar-medium w-[360px] max-[425px]:w-full">
		<div class="grid grid-flow-col auto-cols-max  mt-1 gap-[20px]">
			<div class="grid grid-flow-row">
				<div class="w-[133px] h-[80px] rounded-lg bg-[#fff1e6]">
					<img
						src="/assets/images/my-profile/png/my-profile-award-1.png"
						alt=""
						class="object-contain my-4 mx-11"
					/>
				</div>
				<h3 class=" text-center mt-1">How does growing<br /> up affect me?</h3>
			</div>
			<div class="grid grid-flow-row">
				<div class="w-[133px] h-[80px] rounded-lg bg-[#dfe7fd]">
					<img
						src="/assets/images/my-profile/png/my-profile-award-2.png"
						alt=""
						class="object-contain  my-4  mx-11"
					/>
				</div>
				<h3 class=" text-center mt-1">My body and mind <br />is changing</h3>
			</div>
			<div class="grid grid-flow-row">
				<div class="w-[133px] h-[80px] rounded-lg bg-[#fde2e4]">
					<img
						src="/assets/images/my-profile/png/my-profile-award-3.png"
						alt=""
						class="object-contain my-4 mx-11"
					/>
				</div>
				<h3 class=" text-center mt-1">Dealing with Peer <br />Pressure</h3>
			</div>
		</div>
	</div>
</div>
<!-- </div> -->
