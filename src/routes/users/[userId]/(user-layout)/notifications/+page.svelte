<script lang="ts">
	import type { PageServerData } from './$types';
	// import { timeAgo } from 'short-time-ago';
	import { Helper } from '$lib/utils/helper';
	import { slide } from 'svelte/transition';
	import date from 'date-and-time';
	export let data: PageServerData;

	let records = data.allNotifications.NotificationRecords.Items;
	let notifications = records.map(x => {
		return {
			...x,
			expand: false,
		}
	})

	notifications = notifications.sort((a, b) => { return new Date(b.SentOn)?.getTime() - new Date(a.SentOn)?.getTime(); });

	const handleNotificationClick = async (e) => {
		const notificationId = e.currentTarget.id;
		await update({
			sessionId: data.sessionId,
			notificationId,
			readOn : new Date(),
		});
	}

	async function update(model) {
		const response = await fetch(`/api/server/notifications`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('response',response);
		return response;
  	}

</script>

<!-- <div class="card card-compact card-bordered w-[375px] h-[701px]  bg-base-100 border-slate-200  rounded-none rounded-t-[44px] shadow-sm"> -->
	<div class="card-body ">
		<!-- <button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" /> -->
		<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
			NOTIFICATIONS
		</h2>
		<div class=" card-body h-[590px] overflow-auto scrollbar-medium ">
		{#each notifications as notification}
			<card style="background-color:[]" class={notifications.ReadOn == null ? "mb-1 bg-slate-100 rounded-md" : "mb-1 border-none"}>
				<button on:click|preventDefault={async (e) => {	notification.expand = !notification.expand; await handleNotificationClick(e); }}
					id={notification.id}
					name={notification.id}
					class = "font-semibold leading-3 text-left tracking-normal" >
					<div id={notification.id} class="">
						<div class="pl-2 pr-2 py-2">
							{#if notification.expand}
								<div class="" transition:slide="{{ duration: 1000 }}">
									<h2 class=" text-base mb-1">{notification.Title}</h2>
									{#if notification?.ImageUrl}
										<img class={"w-full mr-2 rounded-md mb-2"} src= {notification.ImageUrl} alt="" />
									{/if}
									<p class="font-normal text-normal pr-1">{Helper.truncateText(notification.Body, 1024)}</p>
								</div>
							{:else}
								<h2 class=" text-base mb-1">{Helper.truncateText(notification.Title, 30)}</h2>
								<div class="flex">
									{#if notification?.ImageUrl}
										<img class={"w-[44px] mr-2 rounded-md"} src= {notification.ImageUrl} alt="" />
									{/if}
									<p class="font-normal text-normal pr-1">{Helper.truncateText(notification.Body, 85)}</p>
								</div>
							{/if}
							<div class="text-right font-medium text-sm px-2 pr-4" >{date.format(new Date(notification.SentOn), 'DD MMM YYYY')}</div>
						</div>
					</div>
				</button>
			</card>
		{/each}
	</div>
	</div>
<!-- </div> -->
