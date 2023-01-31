<script lang="ts">
	import UserSessionLayout from '$lib/components/common/user.session.svelte';
	import Navbar from '$lib/components/navbar/nav.svelte';
	import { navbarDisplay } from '$lib/components/navbar/navbar.display.store';
	import { page } from '$app/stores';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';

	const userId = $page.params.userId;

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
</script>

<svelte:head>
	<title>{$page.data.title ? $page.data.title : 'Sneha-Raahi'}</title>
</svelte:head>

<div class="grid gird-cols justify-center items-center">
	<div class="max-[425px]:w-full max-[425px]:h-full w-[375px] h-[812px] ">
		<div class="flex items-center justify-center ">
			{#if $navbarDisplay}
				<Navbar
					{userId}
					on:logout={async () => {
						await onLogout();
					}}
				/>
			{:else}
				<UserSessionLayout
					{userId}
					on:toggleSidebar={() => {
						console.log(`Sidebar toggled: ${$navbarDisplay}`);
						$navbarDisplay = !$navbarDisplay;
					}}
					on:logout={async () => {
						await onLogout();
					}}
				>
					<slot>
						<main />
					</slot>
				</UserSessionLayout>
			{/if}
		</div>
	</div>
</div>
