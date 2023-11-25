<script lang="ts">
	import '../app.postcss';
	import { initFlash } from 'sveltekit-flash-message/client';
	import { page, navigating } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';
	import { readable } from 'svelte/store';

	////////////////////////////////////////////////////////////

	const flash = initFlash(page);
	beforeNavigate((nav) => {
		if ($flash && nav.from?.url.toString() != nav.to?.url.toString()) {
			$flash = undefined;
		}
	});

	flash.subscribe(($flash) => {
		if (!$flash) return;

		toast($flash.message, {
			icon: $flash.type == 'success' ? '✅' : '❌'
		});

		flash.set(undefined);
	});

</script>

<Toaster />

<!-- {#if browser } -->
<!-- <Toasts/> -->
<!-- {/if} -->

<!-- <Modal show={$modal}> -->
<slot>
	<main />
</slot>
<!-- </Modal> -->
