<script lang="ts">
	import { onMount } from 'svelte';
    import YouTubePlayer from 'youtube-player';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

	export const title = '';
    export let isVideoClosed;
    export let content;

    $:{
        isVideoClosed = false;
    }
  
    const onClose = () => {
        isVideoClosed = true;
		dispatch('closeVideo');
	};

    export let videoId: string;
    let videoElement: HTMLDivElement | null = null;
    let player: ReturnType<typeof YouTubePlayer> | null = null;

    onMount(() => {
        if (videoElement) {
            player = YouTubePlayer(videoElement);
            player.loadVideoById(videoId); 
            player.playVideo();
            player.on('stateChange', function (event) {
                //Caturing video ended event
                if (event.data === 0) {
                    isVideoClosed = true;
                    dispatch('completedVideo',{
                        content
                    });
                }
            });
        }
    })

</script>
{#if !isVideoClosed}
    <div class="relative">
        <div bind:this={videoElement} class="h-48 max-h-full max-w-full"></div>
        <button on:click={() => onClose()} class="absolute right-6 text-white top-4" >X</button>
    </div>
{/if}
