<script lang="ts">
	import type { PageServerData } from './$types';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import {
		personRolesStore,
		genderTypesStore,
	} from '$lib/store/general.store';
	import { selectedLanguage } from '$lib/store/general.store';
	import english from '$lib/localization/english.json';
	import hinglish from '$lib/localization/hinglish.json';

	/////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let localizedContent = $selectedLanguage === 'hinglish' ? hinglish : english;
	personRolesStore.set(data.roles);
	genderTypesStore.set(data.genderTypes);
	LocalStorageUtils.setItem('personRoles', JSON.stringify(data.roles));
	LocalStorageUtils.setItem('genderTypes', JSON.stringify(data.genderTypes));
	// let locations = [];
	// let organizations = data.organizations;
	// organizations = organizations.sort((a, b) => {
	// 	return a.Code - b.Code;
	// });

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	// const onSelectOrganizationName = async (e) => {
	// 	let organizationId = e.currentTarget.value;
	// 	await searchLocation({
	// 		tenantId: organizationId
	// 	});
	// };

	// async function searchLocation(model) {
	// 	let url = `/api/server/user/search-location`;
	// 	const res = await fetch(url, {
	// 		method: 'POST',
	// 		body: JSON.stringify(model),
	// 		headers: { 'content-type': 'application/json' }
	// 	});
	// 	console.log('res', res);
	// 	const response = await res.json();
	// 	console.log('response', response);
	// 	locations = response;
	// }
</script>

<body>
	<div class=" flex items-center justify-center lg:mt-16 md:mt-16 sm:mt-16 mt-0 ">
		<div
			class="card max-[425px]:w-full w-[375px] max-[425px]:border-none h-[812px] max-[812px]:h-screen bg-[#fff] rounded-none border-solid border-2"
		>
			<div class="card-body items-center bg-white text-center justify-center">
				<img
					src="/assets/images/join-raahi/png/logo.png"
					alt=""
					class="w-[110px] h-[50px] mt-[8px] mr-[132px] ml-[133px] object-contain "
				/>
				<div class="text-center leading-tight text-xs font-semibold">Built on REAN Foundation's HealthGuru Platform</div>
				<div class="grid items-center w-[335px] max-[425px]:w-full justify-center">
					<p
						class="mx-[20px] mb-[6px] text-[19px] tracking-wide leading-5 font-bold text-center text-[#5B7AA3]"
					>
						{localizedContent.EnterPhoneNumber}
					</p>
					<p
						class=" mt-[6px] mx-[20px] mb-[10px] text-[16px] font-normal not-italic leading-5 text-center text-[#000] tracking-wide"
					>
						{localizedContent.SignUpDescription}
					</p>
				</div>
				<form class="max-[425px]:w-full" method="post">
					<!-- <div class="text-[#5B7AA3] mx-2 mt-1 py-2 px-3 font-semibold text-start">
						<span>First Name</span>
					</div> -->
					<input
						placeholder="First Name"
						name="firstName"
						required
						type="text"
						class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
					/>
					<input
						placeholder="Last Name"
						type="text"
						name="lastName"
						required
						class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
					/>
					<input
						placeholder="Date of Birth"
						type="date"
						name="birthDate"
						required
						class="h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
					/>
					<input
						placeholder="Phone Number"
						type="number"
						name="phone"
						required
						class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
					/>
					<input
						placeholder="Enter Organization Name"
						name="organization"
						class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
					/>
					<input
						placeholder="Enter Location Name"
						name="location"
						class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
					/>
					<!-- <select
						placeholder="select ngo name"
						name="ngoName"
						class="select h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
						on:change={onSelectOrganizationName}
					>
						<option disabled selected>Select Organization</option>
						{#each organizations as organization}
							<option value={organization.id}>{organization.Name}</option>
						{/each}
					</select>
					<select
						placeholder="select location"
						name="locationId"
						class="select h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
					>
						<option class="text-gray-500 opacity-50" disabled selected>Select Location</option>
						{#each locations as location}
							<option value={location.id}>{location.Name}</option>
						{/each}
					</select> -->
					<div
						class="w-[340px] max-[425px]:w-full h-[52px] mt-[16px] mb-4 pt-[15px] text-center pb-15px  rounded-[10px] bg-[#5B7AA3]"
					>
						<button
							type="submit"
							class="w-[170px] h-[25px] text-[16px] not-italic text-center text-[#fff] tracking-[3px] font-bold"
							>SIGN UP</button
						>
					</div>
				</form>
				<div class="flex justify-center">
					<a href="/"> <span class=" text-xl tracking-widest  font-bold"> BACK TO HOME </span></a>
				</div>
			</div>
			<img src="/assets/images/sign-in/svg/color-strip.svg" alt="" />
		</div>
	</div></body
>
