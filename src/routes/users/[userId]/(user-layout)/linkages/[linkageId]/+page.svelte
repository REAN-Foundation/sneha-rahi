<script lang="ts" >
	import type { PageServerData } from './$types';
	import date from 'date-and-time';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import Image from "$lib/components/image.svelte";

	export let data: PageServerData;
  let notice = data.notice;
	let noticeAction = data.noticeAction;

	const postDate = new Date(data.notice.PostDate);

	const takeActionButtonClick = async (e) => {
		console.log(e.currentTarget);
		const noticeId = e.currentTarget.id;
		console.log(`noticeId = ${noticeId}`)
		await takeAction({
			sessionId: data.sessionId,
			userId: data.userId,
			noticeId: data.notice.id,
			action: 'Apply for job',
			title: data.notice.Title,
			resourceId: data.notice.resourceLink,
		});
		goto(`/users/${data.userId}/linkages`);
	}

	const backToLinkages = () => {
		goto(`/users/${data.userId}/linkages`);
	}

	const onApplyButtonClick = () => {
		goto(`${data.notice.Link}`);
	}

	async function takeAction(model) {
		const response = await fetch(`/api/server/linkages/take-action`, {
		method: 'POST',
		body: JSON.stringify(model),
		headers: {
			'content-type': 'application/json'
		}
		});
		const resp = await response.text();
		const noticeAction = JSON.parse(resp);
		if (noticeAction) {
			toast.success(`Action taken successfully!`);
		}
  }

</script>

<!-- <div class="card card-compact card-bordered w-[375px] h-[701px]  bg-base-100 border-slate-200  rounded-none rounded-t-[44px] shadow-sm"> -->
	<div class="card-body overflow-auto scrollbar-medium ">
		<!-- <button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" /> -->
		<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
			LINKAGE - JOB
		</h2>
		<div class="flex justify-center mt-5 w-full">
			<!-- <img class="w-1/4 h-[3.625rem] bg-[#fde2e4] rounded-lg" src={data.notice.ImageUrl} alt=""/> -->
			<Image cls="rounded w-1/4 h-[3.625rem]" source={notice.ImageUrl + "?disposition=inline"} w=162 h=162 />
			<div class="ml-3 w-3/4 ">
				<div id={data.notice.id} class="flex mb-4">
					<h3 class="text-left leading-5" >{data.notice.Title}</h3>
					<div class="text-base font-normal ml-4 leading-5 max-[320px]:leading-1">{date.format(postDate, 'DD MMM YYYY')}</div>
				</div>
			</div>
		</div>
		<div class="h-auto mb-4">
			<p>
				{data.notice.Description}
			</p>
		</div>
		
		<!-- <a href={`/users/${data.userId}/linkages`}> -->
			{#if noticeAction == null}
			<button
					on:click|preventDefault = {onApplyButtonClick}
					id={notice.id}
					name={notice.id}
					class=" h-[52px] w-[340px] max-[425px]:w-full mt-2 text-[#fff] rounded-lg bg-[#5b7aa3]">
					APPLY FOR JOB
				</button>
				<!-- <button
					on:click|preventDefault = {(e)=>takeActionButtonClick(e)}
					id={notice.id}
					name={notice.id}
					class=" h-[52px] w-[340px] max-[425px]:w-full mt-2 text-[#fff] rounded-lg bg-[#5b7aa3]">
					APPLY FOR JOB
				</button> -->
				<button on:click|preventDefault = {backToLinkages} class="text-center mt-3">
					 BACK TO LINKAGES 
				</button>
			{:else}
				<div class="text-center bg-[#70ae6e] p-3 rounded-md text-white">
					<p>You have already applied for this job!</p>
				</div>
				<button
					on:click|preventDefault = {backToLinkages}
					class="mt-4 rounded-lg">
					BACK TO LINKAGES 
				</button>
			{/if}
	<!-- </a> -->
	</div>
<!-- </div> -->

