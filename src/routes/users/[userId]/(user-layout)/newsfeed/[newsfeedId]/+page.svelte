<script lang="ts">
	import { timeAgo } from 'short-time-ago';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import Image from '$lib/components/image.svelte';
	export let data: PageServerData;
	const userId = $page.params.userId;
	let feedItem = data.feedItem;
	const pubdate = new Date(data.feedItem.PublishingDate);
	console.log('pubdate', pubdate);
	console.log('feedItem', feedItem);
</script>
<svelte:head>
    <title>Sneha Raahi-Newsfeed Item</title> 
</svelte:head>
<div class="card-body ">
	<h2 class=" text-[#5B7AA3] flex  justify-center uppercase tracking-widest font-bold text-base">
		Newsfeed
	</h2>
	<h4 class="text-right  text-[13px] font-semibold mb-1">{timeAgo(pubdate, new Date())}</h4>
	<div
		class="w-[340px] max-[425px]:w-full min-h-0 max-h-[500px] overflow-auto scrollbar-medium rounded-lg bg-[#d7eaf7]"
	>
		<div class="flex p-1 mt-4">
			<div class="w-[50px] mt-2 ml-2 h-[45px] rounded-lg bg-[#fff] flex-none">
				<img src="/assets/images/newsfeed/png/logo.png" alt="" class="mt-2 p-1" />
			</div>
			<div class="ml-4">
				<h2 class="text-left text-[14px] leading-5 mt-2 mb-3">
					{feedItem.Title}
				</h2>
				<p
					class="pr-1 font-normal leading-5 text-md min-h-0 max-h-[200px] overflow-auto scrollbar-medium py-1"
				>
					{feedItem.Description}
				</p>
			</div>
		</div>
		<div class="flex justify-center m-4">
			<!-- <img
					src={feedItem.Image}
					alt=""
					class="w-[310px] max-[425px]:mx-4 max-[425px]:w-full item-center my-3 h-[200px] rounded-lg "
				/> -->
			<Image
				cls="w-[310px] max-[425px]:mx-4 max-[425px]:w-full item-center h-[200px] rounded-lg"
				source={feedItem.Image + '?disposition=inline'}
				w="162"
				h="162"
			/>
		</div>
	</div>
		<a href="/users/{userId}/newsfeed">
			<div class="h-20 w-[375px] max-[425px]:w-full mt-3 flex justify-center ">
				<button class="">BACK TO NEWSFEED</button>
			</div></a
		>
</div>
<!-- <div class="h-[90px] w-[375px] max-[425px]:w-full bg-white">
	<a href="/users/{userId}/newsfeed">
		<div class="h-20 w-[375px] max-[425p x]:w-full mt-3 flex justify-center ">
			<button class="">BACK TO NEWSFEED</button>
		</div></a
	>
</div> -->
