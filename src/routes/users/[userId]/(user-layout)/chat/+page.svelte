<script lang="ts">
	import type { PageServerData } from './$types';
	import Image from '$lib/components/image.svelte';
	import { page } from '$app/stores';
	import { errorMessage, showMessage, successMessage } from '$lib/utils/message.utils';

	export let data: PageServerData;
	let favourites = data.favouriteConversations;
	let recentUsers = data.recentConversations;
	console.log('Favourites users',`${JSON.stringify(favourites, null, 2)}`);
	console.log('Recent users',`${JSON.stringify(recentUsers, null, 2)}`);

	const ENTER_KEY_CODE = 13;
	const userId = $page.params.userId;
	let searchInput;
	let searchResults = [];
	let searchPeformed = false;
	//Make it reactive
	$: searchedUsers = searchResults;

	const onSearchClick = async (e) => {
		const text = searchInput.value;
		await searchUsers(text);
	}

	const onSearchTextEntered = async (e) => {
		const keyCode = e.keyCode;
		if (keyCode == ENTER_KEY_CODE) {
			const text = searchInput.value;
			await searchUsers(text);
		}
	}

	//on:input={onSearchTextEntered}

	const onSearchEnter = async (e) => {
		const keyCode = e.keyCode;
		if (keyCode == ENTER_KEY_CODE) {
			const text = searchInput.value;
			if (text.length > 2) {
				await searchUsers(text);
			}
		}
	}

	const searchUsers = async (text) => {
		searchPeformed = true;
		const response = await fetch(`/api/server/chat/search-users?text=${text}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		const users = await response.json();
		console.log(JSON.stringify(users));
		searchResults = users.filter(x => x.userId != userId);
		//Take only top 5 results
		searchResults = searchResults.slice(0, 5);
		console.log(JSON.stringify(searchResults));
	}

	const onSearchedCoversationClick = async (e, otherUserId?: string) => {
		searchPeformed = true;
		const response = await fetch(`/api/server/chat/conversations-for-users?userId=${userId}&otherUserId=${otherUserId}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		const resp = await response.text();
		console.log(`conversation found: `, JSON.stringify(resp, null, 2));
		const conversation = JSON.parse(resp);
		if (conversation) {
			const redirectPath = `/users/${userId}/chat/${conversation.id}`;
			console.log(redirectPath);
			window.location.href = redirectPath;
		}
		else {
			console.log(`Conversation not found! Starting new one`);
			const response = await fetch(`/api/server/chat/start-conversation`, {
				method: 'POST',
				body: JSON.stringify({
					sessionId: data.sessionId,
					userId: userId,
					otherUserId: otherUserId,
				}),
				headers: {
					'content-type': 'application/json'
				}
			});
			const resp = await response.text();
			console.log(`conversation found: `, JSON.stringify(resp, null, 2));
			const conversation = JSON.parse(resp);
			if (conversation) {
				const redirectPath = `/users/${userId}/chat/${conversation.id}`;
				console.log(redirectPath);
				window.location.href = redirectPath;
			}
			else {
				showMessage(`Unable to start conversation!`, 'error', true, 3500);
			}
		}
	}

	 const handleDeleteChat = async (e, id) => {
		const conversationId = id;
		await deleteConversation({
			sessionId: data.sessionId,
		    conversationId
		});
	};

	async function deleteConversation(model) {
		console.log("model",model);
		const response = await fetch(`/api/server/chat/delete-conversation`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('response', response);
		window.location.href = `/users/${userId}/chat`;
	};


</script>

<!-- <div class="card card-compact card-bordered w-[375px] h-[701px]  bg-base-100 border-slate-200 rounded-none rounded-t-[44px] shadow-sm"> -->
	<div class="card-body ">
		<!-- <button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" /> -->
		<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
			CHAT HOME
		</h2>
		<div class="relative flex items-center ">
			<input
				placeholder="Search"
				id="search"
				name="search"
				bind:this={searchInput}
				class=" text-[#5b7aa3] h-[40px] w-full px-3 border border-slate-400 rounded-3xl my-5 text-lg bg-[#ffffff]  "
				on:keyup={onSearchEnter}
			/>
			<!-- class="right-48 pr-3 ml-3 w-2/12" -->
			<img
				id="searchButton"
				class="absolute right-0 pr-3 w-2/9 "
				src="/assets/images/home-sidebar/png/search-icon.png"
				alt=""
				on:click={onSearchClick}
				on:keyup={onSearchEnter}
			/>
		</div>
		{#if searchPeformed}
			<div class="overflow-auto scrollbar-medium w-[365px] max-[425px]:w-full">
				<div class="grid grid-flow-col auto-cols-max gap-3">
					{#if searchedUsers.length === 0}
						<h3 class="text-center font-medium mt-2">No results found!</h3>
					{:else}
						{#each searchedUsers as searchedUser}
							<button on:click={async (e) => onSearchedCoversationClick(e, searchedUser.userId)} class="tracking-normal font-sm">
								<div class="grid grid-rows-2 ">
									{#if searchedUser.profileImage.includes(null)}
										<img src="/assets/images/chat/png/account-img-1.png" alt="" />
									{:else}
										<Image cls="rounded-full" h="58" w="58" source={searchedUser.profileImage} ></Image>
									{/if}
									<h3 class=" mt-3 text-sm ">{searchedUser.firstName} <br />{searchedUser.lastName}</h3>
								</div>
							</button>
						{/each}
					{/if}
				</div>
			</div>
		{/if}
		<h2 class="flex justify-left text-normal">Favourites</h2>
		<div class="overflow-auto scrollbar-medium w-[365px] max-[425px]:w-full">
			<div class="grid grid-flow-col mt-2 auto-cols-max gap-3">
				{#if favourites.length === 0}
					<h3 class="text-center font-normal mb-2">No favourites so far!</h3>
				{:else}
					{#each favourites as favourite}
						<a href={`/users/${userId}/chat/${favourite.id}`}>
							<div class="grid grid-rows-2 ">
								{#if favourite.profileImage.includes(null)}
									<img src="/assets/images/chat/png/account-img-1.png" alt="" />
								{:else}	
									<Image cls="rounded-full" h="58" w="58" source={favourite.profileImage} ></Image>
								{/if}
								<h3 class="mt-3 text-sm">{favourite.firstName} <br />{favourite.lastName}</h3>
							</div>
						</a>
					{/each}
				{/if}
				<!-- <a href="/chat-individual">
					<div class="grid grid-rows-2 ">
						<img src="/assets/chat/png/account-img-2.png" alt="" />
						<h3 class=" mt-3 text-sm ">jemma <br />Doe</h3>
					</div>
				</a>
				<a href="/chat-individual">
					<div class="grid grid-rows-2 ">
						<img src="/assets/chat/png/account-img-3.png" alt="" />
						<h3 class=" mt-3 text-sm">jayesh <br />Doe</h3>
					</div>
				</a>
				<a href="/chat-individual">
					<div class="grid grid-rows-2 ">
						<img src="/assets/chat/png/account-img-4.png" alt="" />
						<h3 class=" mt-3 text-sm ">jacob <br />Doe</h3>
					</div>
				</a>
				<a href="/chat-individual">
					<div class="grid grid-rows-2 ">
						<img src="/assets/chat/png/account-img-5.png" alt="" />
						<h3 class=" mt-3 text-sm ">jenny <br />Doe</h3>
					</div>
				</a>
				<a href="/chat-individual">
					<div class="grid grid-rows-2 ">
						<img src="/assets/chat/png/account-img-6.png" alt="" />
						<h3 class=" mt-3 text-sm">jaspreet <br />Doe</h3>
					</div>
				</a> -->
			</div>
		</div>
		<h2 class="flex  justify-left ">Recent Chats</h2>
		<div class="overflow-auto scrollbar-medium h-[400px]">
			{#if recentUsers.length === 0}
				<h3 class="m-1">No recent conversations!</h3>
			{:else}
				{#each recentUsers as conversation}

						<div class="grid grid-flex-rows-6 mb-3 gap-2 mt-2">
							<div class="grid grid-flow-col ">
								<a href={`/users/${userId}/chat/${conversation.id}`}>
								<!-- <img src="/assets/chat/png/account-img-1.png" alt="" /> -->
								{#if conversation.profileImage.includes(null)}
									<img src="/assets/images/chat/png/account-img-1.png" alt="" />
								{:else}
									<Image cls="rounded-full col-span-2" h="58" w="58" source={conversation.profileImage} ></Image>
								{/if}
								</a>
								<div class="grid grid-flow-rows-2 col-span-3 ml-2 mt-4">
									<div class="flex relative">
										<a href={`/users/${userId}/chat/${conversation.id}`}>
										<h3 class="text-left">{conversation.displayName}</h3>
										</a>
										<!-- <br/> -->
										<div class="text-base px-2 font-normal leading-5 ">
											{conversation.lastChatDate}
										</div>

										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<img on:click = {(e) => handleDeleteChat(e , conversation.id)} class="absolute right-0 " src="/assets/images/chat/png/delete.png" alt="" />

									</div>

								</div>
							</div>
						</div>

				{/each}
			{/if}

			<!-- <a href="/chat-individual">
				<div class="grid grid-rows mt-1 auto-row mb-3 gap-2">
					<div class="grid grid-flow-col">
						<img src="/assets/chat/png/account-img-2.png" alt="" />
						<div class="grid grid-flow-rows-2 ml-2">
							<div class="flex relative mt-2 ">
								<h3 class="text-left   ">jamma Doe</h3>
								<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">
									12 Dec
								</div>
							</div>
							<p class="">Lorem ipsum dolor sit amet, conse…</p>
						</div>
					</div>
				</div>
			</a>
			<a href="/chat-individual">
				<div class="grid grid-flow-row mt-1 auto-row mb-3 gap-2">
					<div class="grid grid-flow-col">
						<img src="/assets/chat/png/account-img-3.png" alt="" />
						<div class="grid grid-flow-rows-2 ml-2">
							<div class="flex relative mt-2 ">
								<h3 class="text-left  ">jayesh Doe</h3>
								<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">
									12 Dec
								</div>
							</div>
							<p class="">Lorem ipsum dolor sit amet, conse…</p>
						</div>
					</div>
				</div>
			</a>
			<a href="/chat-individual">
				<div class="grid grid-flow-row mt-1 auto-row mb-3 gap-2">
					<div class="grid grid-flow-col">
						<img src="/assets/chat/png/account-img-4.png" alt="" />
						<div class="grid grid-flow-rows-2 ml-2">
							<div class="flex relative mt-2 ">
								<h3 class="text-left ">jacob Doe</h3>
								<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">
									12 Dec
								</div>
							</div>
							<p class="">Lorem ipsum dolor sit amet, conse…</p>
						</div>
					</div>
				</div>
			</a>
			<a href="/chat-individual">
				<div class="grid grid-flow-row mt-1 auto-row mb-3 gap-2">
					<div class="grid grid-flow-col">
						<img src="/assets/chat/png/account-img-5.png" alt="" />
						<div class="grid grid-flow-rows-2 ml-2">
							<div class="flex relative mt-2 ">
								<h3 class="text-left  ">jenny Doe</h3>
								<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">
									12 Dec
								</div>
							</div>
							<p class="">Lorem ipsum dolor sit amet, conse…</p>
						</div>
					</div>
				</div>
			</a>
			<a href="/chat-individual">
				<div class="grid grid-flow-row mt-1 auto-row mb-3 gap-2">
					<div class="grid grid-flow-col">
						<img src="/assets/chat/png/account-img-6.png" alt="" />
						<div class="grid grid-flow-rows-2 ml-2">
							<div class="flex relative mt-2 ">
								<h3 class="text-left  ">jaspreet Doe</h3>
								<div class="text-base font-semibold absolute right-0 pr-3 leading-5 ">
									12 Dec
								</div>
							</div>
							<p class="">Lorem ipsum dolor sit amet, conse…</p>
						</div>
					</div>
				</div>
			</a> -->
		</div>
	</div>
<!-- </div> -->
