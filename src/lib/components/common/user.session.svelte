<script lang="ts">
	import Toasts from '$lib/components/toast/toasts.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { draggable } from '@neodrag/svelte';

	const dispatch = createEventDispatcher();
	export let userId = null;
	let askSnehaLink;
	let chatLink;
	let notificationsLink;

	const toggleSidebar = () => {
		console.log(`toggling the sidebar`);
		dispatch('toggleSidebar');
	};

	const gotoLogout = async () => {
		toggleSidebar();
		dispatch('logout');
	};

	onMount(() => {
		askSnehaLink = `/users/${userId}/ask-sneha`;
		chatLink = `/users/${userId}/chat`;
		notificationsLink = `/users/${userId}/notifications`;
		console.log(askSnehaLink);
		console.log(notificationsLink);
		console.log(chatLink);
	});
</script>

<div
	class="card rounded-none  bg-[#5b7aa3] max-[425px]:w-screen w-[375px] h-[812px] shadow-none lg:mt-10 md:mt-10 sm:mt-10 mt-0"
>
	<div class="card max-[375px]:w-full w-[375px] h-[130px] bg-[#5b7aa3] shadow-none rounded-none border-none">
		<Toasts />
		<div class="card-body">
			<div class=" flex flex-row h-16 w-16">
				<button on:click|capture={toggleSidebar}>
					<img src="/assets/images/home/svg/menu.svg" alt="" />
				</button>
				<!-- <a href={`/users/${userId}/my-profile`}> -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					on:click={async () => {
						await gotoLogout();
					}}
					class="absolute right-0  h-[74px] w-[74px] "
					src="/assets/images/home/png/ask.png"
					alt=""
				/>
				<!-- </a> -->
			</div>
			<div class="flex flex-row justify-center relative">
				<a href={askSnehaLink}>
					<img
						class="mr-2"
						src="/assets/images/home/svg/ask-sneha.svg"
						alt=""
					/></a
				>
				<a href={chatLink}>
					<img class="" src="/assets/images/home/svg/message.svg" alt="" /></a
				>
				<a href={notificationsLink}>
					<img class="" src="/assets/images/home/png/notification.png" alt="" /></a
				>
			</div>
		</div>
	</div>
	<div
		use:draggable={{
			axis: 'y',
			bounds: { top: 140, bottom:-200},
			handle: '.handle',
			ignoreMultitouch: true,
			disabled: false,
			applyUserSelectHack: true,
			gpuAcceleration: false 
			// onDragStart: ({ offsetY}) => {
			// 	let y = offsetY 
			// 	},
			// 	onDragEnd: ({offsetY}) => {
			// 		let y = offsetY
			// 	},
			}}
		
		class="card card-compact card-bordered max-[425px]:border-none max-[425px]:w-full w-[375px] h-[690px] bg-base-100  rounded-none rounded-t-[44px] shadow-sm max-[425px]:shadow-none"
	>
		<div class="flex justify-center">
			<button class=" h-[5px] w-[73px] bg-[#e3e3e3] mt-4 rounded handle" />
		</div>
		<slot />
	</div>
</div>
