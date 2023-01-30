<script lang="ts">
	import { timeAgo } from 'short-time-ago';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	export let data: PageServerData;
	const userId = $page.params.userId;
	let feedItem = data.feedItem;
	const pubdate = new Date(data.feedItem.PublishingDate);
	console.log("pubdate", pubdate);
	console.log("feedItem", feedItem);
</script>

	<div class="card-body ">
		<h2 class=" text-[#5B7AA3] flex  justify-center uppercase tracking-widest font-bold text-base">
			Newsfeed
		</h2>
			<h4 class="text-right  text-[13px] font-semibold mb-1">{timeAgo(pubdate, new Date())}</h4>
			<div class="w-[340px] max-[425px]:w-full h-full overflow-auto scrollbar-medium rounded-lg bg-[#f2e2da]">
				<div class="flex p-1 mt-4">
					<div class="w-[50px] mt-2 ml-2 h-[45px] rounded-lg bg-[#fff] flex-none">
						<img
							src="/assets/images/newsfeed/png/logo.png"
							alt=""
							class="mt-2 p-1"
						/>
					</div>
					<div>
						<h2 class="ml-4 text-left text-[14px] leading-5 mt-2 mb-3">
							{feedItem.Title}
						</h2>
						<p class="pr-1 text-[14px] ">
							{feedItem.Description}
						</p>
					</div>
				</div>
				<div class="flex justify-center">
				<img
					src={feedItem.Image}
					alt=""
					class="w-[310px] max-[425px]:mx-4 max-[425px]:w-full item-center my-3 h-[200px] rounded-lg "
				/>
			</div>
			</div>
	</div>
	<div class="h-[90px] w-[375px] max-[425px]:w-full bg-white">
		<a href="/users/{userId}/newsfeed">
		<div class="h-20 w-[375px] max-[425px]:w-full mt-3 flex justify-center ">
			<!-- <textarea
				type="text"
				class="h-[52px] p-3 ml-3 mt-3  w-[277px] rounded-lg bg-white"
				placeholder="Start typing here…"
			/>
			<div class="relative h-[50px] w-[50px] bg-[#5b7aa3] rounded-lg ml-3 mt-3  ">
				<img class="m-3" src="/assets/images/ask-sneha/png/send.png" alt="" />
			</div> -->

			<button class="">BACK TO NEWSFEED</button>
		</div></a>
	</div>


