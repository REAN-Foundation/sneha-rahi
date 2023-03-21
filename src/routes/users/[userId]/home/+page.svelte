<script lang="ts">
	import { showMessage } from '$lib/utils/message.utils';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/navbar/nav.svelte';
	import { navbarDisplay } from '$lib/components/navbar/navbar.display.store';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { draggable } from '@neodrag/svelte';
	let show = true;

	let userId = $page.params.userId;
	export let data: PageServerData;
	let firstName = data.user.User.Person.FirstName;
	let learningHomeLink;
	let myProfileLink;
	let askSnehaLink;
	let newsFeedLink;
	let chatLink;
	let linkagesLink;
	let notificationsLink;

	const toggleSidebar = () => {
		console.log(`Sidebar toggled: ${$navbarDisplay}`);
		$navbarDisplay = !$navbarDisplay;
	};

	const onLogout = async () => {
		const response = await fetch(`/api/server/logout`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});
		const resp = await response.text();
		console.log(`resp: ${JSON.stringify(resp, null, 2)}`);
		LocalStorageUtils.removeItem('showSplash');
		window.location.href = '/sign-in';
	};

	onMount(() => {
		learningHomeLink = `/users/${userId}/my-learnings`;
		myProfileLink = `/users/${userId}/my-profile`;
		askSnehaLink = `/users/${userId}/ask-sneha`;
		newsFeedLink = `/users/${userId}/newsfeed`;
		chatLink = `/users/${userId}/chat`;
		linkagesLink = `/users/${userId}/linkages`;
		notificationsLink = `/users/${userId}/notifications`;

		const prevUrl = LocalStorageUtils.getItem('prevUrl');
		console.log(`prevUrl = ${JSON.stringify(LocalStorageUtils.getItem('prevUrl'))}`);
		if (prevUrl.includes('sign-in-otp')) {
			showMessage('Login successful!', 'success');
		}
	});
</script>

<div class="grid gird-cols justify-center items-center ">
	<div class="max-[425px]:w-full max-[425px]:h-full w-[375px] h-[812px]">
		<div class="flex  items-center justify-center">
			{#if $navbarDisplay}
			<Navbar
				{userId}
				on:logout={async () => {
					await onLogout();
				}}
			/>
			{:else}
			<div
				class="card rounded-none max-[425px]:w-full w-[375px] h-[812px] bg-[#5b7aa3] shadow-none lg:mt-10 md:mt-10 sm:mt-10 mt-0"
			>
				<div class="card max-[425px]:w-full w-[375px] h-[406px] shadow-none rounded-none border-none">
					<div class="card-body ">
						<div class=" flex flex-row h-16 w-16">
							<button on:click={toggleSidebar}>
								<img src="/assets/images/home/svg/menu.svg" alt="" />
							</button>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<img
								on:click={onLogout}
								class="absolute right-0 h-[74px] w-[74px]"
								src="/assets/images/home/png/ask.png"
								alt=""
							/>
						</div>
						<h1 class="card-title text-base-100 text-3xl">Hi {firstName}!</h1>
						<p class=" text-base-100">
							Welcome to Raahi, your friend, companion and guide as you navigate your journey into
							adulthood.
						</p>
					</div>
					<div class="flex flex-row gap-3 justify-center relative">
						<a href={askSnehaLink}>
							<img
								class="mr-2"
								src="/assets/images/home/svg/ask-sneha.svg"
								alt=""
							/></a
						>
						<a href={chatLink}> <img src="/assets/images/home/svg/message.svg" alt="" /></a>
						<a href={notificationsLink}>
							<img src="/assets/images/home/png/notification.png" alt="" /></a
						>
					</div>
				</div>
					<div
					use:draggable={{
						axis: 'y',
						bounds: { top: 300, bottom:90},
						handle: '.handle' ,
						ignoreMultitouch: true,
						disabled: false,
						applyUserSelectHack: true,
					}}
						class="card card-compact bg-white card-bordered max-[425px]:border-none border-slate-200 rounded-none rounded-t-[44px] shadow-none"
					>
					<div class="flex justify-center">
						<button class=" h-[5px] w-[73px] bg-[#e3e3e3] mt-4 rounded handle" />
					</div>
						<div class="card-body h-[450px] max-[425px]:h-[550px] place-content-around ">
							<div class="overflow-auto h-[550px] scrollbar scrollbar-medium">
								<h2
									class="card-title text-[#5b7aa3]  max-[320px]:tracking-wider flex tracking-widest justify-center text-base "
								>
									GET STARTED ON YOUR JOURNEY
								</h2>
								<a href={learningHomeLink}>
									<img
										class=" h-[172px] w-[340px] max-[425px]:w-full"
										src="/assets/images/home/png/my-learning.png"
										alt=""
									/>
								</a>
								<div class="columns-2 mt-2 ">
									<a href={newsFeedLink}>
										<img class=" mb-4 max-[425px]:w-full" src="/assets/images/home/png/newsfeed.png" alt="" /></a
									>
									<a href={linkagesLink}>
										<img class="max-[425px]:w-full" src="/assets/images/home/png/linkages.png" alt="" /></a
									>
									<div>
										<a href={chatLink}>
											<img class=" mb-4 max-[425px]:w-full" src="/assets/images/home/png/chat.png" alt="" /></a
										>
										<a href={myProfileLink}>
											<img class="max-[425px]:w-full" src="/assets/images/home/png/my-profile.png" alt="" /></a
										>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/if}
			</div>
		</div>
	</div>

