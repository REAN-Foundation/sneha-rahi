<script lang="ts">
	import type { PageServerData } from './$types';
	import { timeAgo } from 'short-time-ago';
	export let data: PageServerData;
	let allLinkages = data.allLinkages.NoticeRecords.Items;
	console.log(`\n AllLinkages = ${JSON.stringify(allLinkages)}`);
</script>


<!-- <div class="card card-compact card-bordered w-[375px] h-[701px]  bg-base-100 border-slate-200 rounded-none rounded-t-[44px] shadow-sm"> -->
	<div class="card-body ">
		<!-- <button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" /> -->
		<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
			LINKAGES
		</h2>
		<div class="card-body h-[610px] overflow-auto scrollbar-medium">
			{#if allLinkages.length == 0}
				<h3 class="text-slate-500">No linkages to show</h3>
			{:else}
				{#each allLinkages as notice}
					<div class="first:mt-2 mb-3" id= {notice.id} >
						<a href={`/users/${data.userId}/linkages/${notice.id}`}>
							<div class="grid grid-flow-col ">
								<img class="w-[3.625rem] h-[3.625rem] bg-[#fde2e4] rounded-lg" src={notice.ImageUrl} alt=""/>
								<div class="ml-3 ">
									<div class="flex relative mb-1 ">
										<h3 class="text-left">{notice.Title.length > 20 ? notice.Title.substring(0, 16) + '...': notice.Title}</h3>
										<div class="text-right text-xs font-semibold ml-4 absolute right-0 p-0 leading-3 ">{timeAgo(new Date(notice.PostDate))}</div>
									</div>
									<!-- <div class="text-right text-xs font-semibold ml-4 right-2 p-0 leading-5 ">{timeAgo(new Date(notice.PostDate))}</div> -->
									<div class="flex mb-1 ">
									<p>{notice.Description.length > 50 ? notice.Description.substring(0, 55) + '...': notice.Description}</p>
									{#if notice.UserAction}
										<img class="text-right" src="/assets/images/quiz-wrong/svg/correct.svg" alt="" />
									{:else}
										<img class="hidden" src="/assets/images/quiz-wrong/svg/correct.svg" alt="" />
									{/if}
									</div>
								</div>
							</div>
						</a>
					</div>
				{/each}
			{/if}
			<!-- <a href="/notices-details">
			<div class="grid grid-flow-col mb-1">
				<div class="w-[3.625rem] h-[3.625rem] bg-[#dfe7fd] rounded-lg" />
				<div class="ml-3 ">
					<div class="flex mb-1 ">
						<h3>Lorem ipsum dolor...</h3>
						<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
					</div>
					<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus…</p>
				</div>
			</div></a>
			<a href="/notices-details">
			<div class="grid grid-flow-col mb-1">
				<div class="w-[3.625rem] h-[3.625rem] bg-[#fff1e6] rounded-lg" />
				<div class="ml-3 ">
					<div class="flex mb-1">
						<h3>Lorem ipsum dolor...</h3>
						<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
					</div>
					<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
				</div>
			</div></a>
			<a href="/notices-details">
			<div class="grid grid-flow-col mb-1">
				<div class="w-[3.625rem] h-[3.625rem] bg-[#e3e3e3] rounded-lg" />
				<div class="ml-3 ">
					<div class="flex mb-1 ">
						<h3>Lorem ipsum dolor...</h3>
						<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
					</div>
					<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
				</div>
			</div></a>
			<a href="/notices-details">
			<div class="grid grid-flow-col mb-1">
				<div class="w-[3.625rem] h-[3.625rem] bg-[#e3e3e3] rounded-lg" />
				<div class="ml-3 ">
					<div class="flex mb-1">
						<h3>Lorem ipsum dolor...</h3>
						<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
					</div>
					<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
				</div>
			</div></a>
			<a href="/notices-details">
			<div class="grid grid-flow-col mb-1">
				<div class="w-[3.625rem] h-[3.625rem] bg-[#fff1e6] rounded-lg" />
				<div class="ml-3 ">
					<div class="flex mb-1 ">
						<h3>Lorem ipsum dolor...</h3>
						<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
					</div>
					<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
				</div>
			</div></a>
			<a href="/notices-details">
			<div class="grid grid-flow-col mb-1">
				<div class="w-[3.625rem] h-[3.625rem] bg-[#dfe7fd] rounded-lg" />
				<div class="ml-3 ">
					<div class="flex mb-1">
						<h3>Lorem ipsum dolor...</h3>
						<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
					</div>
					<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
				</div>
			</div></a>
			<a href="/notices-details">
			<div class="grid grid-flow-col mb-1">
				<div class="w-[3.625rem] h-[3.625rem] bg-[#fde2e4] rounded-lg" />
				<div class="ml-3 ">
					<div class="flex mb-1 ">
						<h3>Lorem ipsum dolor...</h3>
						<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
					</div>
					<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
				</div>
			</div>
		</a>
			<a href="/notices-details">
			<div class="grid grid-flow-col mb-1">
				<div class="w-[3.625rem] h-[3.625rem] bg-[#fde2e4] rounded-lg" />
				<div class="ml-3 ">
					<div class="flex mb-1">
						<h3>Lorem ipsum dolor...</h3>
						<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
					</div>
					<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
				</div>
			</div>
		</a>
			<a href="/notices-details">
			<div class="grid grid-flow-col mb-1">
				<div class="w-[3.625rem] h-[3.625rem] bg-[#fde2e4] rounded-lg" />
				<div class="ml-3 ">
					<div class="flex mb-1">
						<h3>Lorem ipsum dolor...</h3>
						<div class="text-base font-semibold ml-4  leading-5 ">12 Dec</div>
					</div>
					<p>Sed vestibulum ipsum ut tortor inter dum, vel pretium lacus …</p>
				</div>
			</div>
		</a> -->
		</div>
	</div>
<!-- </div> -->
