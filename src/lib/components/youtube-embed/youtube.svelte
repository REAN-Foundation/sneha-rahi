<script>
	// @ts-nocheck
	export let id = null;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export const title = '';
  let scale =''
	const onClose = () => {
		dispatch('closeVideo');
	};

	let videoInfo = {};
	videoInfo = fetch(
		`//www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
	).then((res) => res.json());
</script>

{#await videoInfo then { title, width, height }}
	<div class="relative hover:[#00000030]-" style="--aspect-ratio:{width / height || '16/9'}" {title}>
    <button on:click={() => onClose()} class="absolute right-2 text-white top-6">X</button>
		<iframe
			src="https://www.youtube.com/embed/{id}?autoplay=1&rel=0"
			{title}
			frameborder="0"
			allow="autoplay; picture-in-picture; clipboard-write"
			allowfullscreen
			in:scale={{ delay: 500, duration: 800 }}
		/>
	</div>
{/await}

<style>
	iframe {
		height: auto;
		aspect-ratio: var(--aspect-ratio);
		width: 100%;
	}
</style>
