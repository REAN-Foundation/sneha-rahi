<script lang="ts">
	import type { PageServerData } from './$types';
	import Image from '$lib/components/image.svelte';
	import { page } from '$app/stores';
	import { showMessage } from '$lib/utils/message.utils';
	import { getDateSegregatedMessages } from './conversation.utils';
	import { onDestroy, onMount } from 'svelte';

	const ENTER_KEY_CODE = 13;
	const MESSAGE_POLL_DURATION = 2500;

	export let data: PageServerData;
	let conversation = data.conversation;
	$: conversation = conversation;
	let srcUrl = 'http://localhost:7272/api/v1/file-resources/null/download?disposition=inline';
	let _messages = data.messages;
	$: messages = _messages;

	const userId = $page.params.userId;
	const conversationId = $page.params.conversationId;

	let messageInput; //Message input text area
	let messageContainer; //Message holding container

	console.log(`${JSON.stringify(conversation, null, 2)}`);
	console.log(`${JSON.stringify(messages, null, 2)}`);

	$: if (messageContainer && messageContainer.scrollTop < messageContainer.scrollHeight) {
		messageContainer.scrollTop = messageContainer.scrollHeight;
	}

	let timerId;

	function startTimer() {
		clearTimeout(timerId);
		timerId = setTimeout(async () => {
			await loadMessages(conversationId);
			clearTimeout(timerId);
			startTimer();
		}, MESSAGE_POLL_DURATION);
	}

	onMount(() => {
		startTimer();
	});

	onDestroy(() => {
		clearTimeout(timerId);
	});

	const onSendMessageClick = async () => {
		const message_ = messageInput.value as string;
		console.log(message_);
		const msg = message_.trim();
		if (msg.length == 0) {
			return;
		}
		await sendMessage(msg);
		await loadMessages(conversationId);
	}

	const onSendMessageKeyPressed = async (e) => {
		const keyCode = e.keyCode;
		if (keyCode == ENTER_KEY_CODE) {
			const message_ = messageInput.value as string;
			console.log(message_);
			const msg = message_.trim();
			if (msg.length == 0) {
				return;
			}
			await sendMessage(msg);
			await loadMessages(conversationId);
		}
	}

	const toggleFavourite = async () => {
		conversation.favourite = !conversation.favourite;
		const response = await fetch(`/api/server/chat/mark-as-favourite`, {
			method: 'PUT',
			body: JSON.stringify({
				sessionId: data.sessionId,
				conversationId: conversationId,
				favourite: conversation.favourite,
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
		const resp = await response.text();
		if (conversation.favourite) {
			showMessage(`Added as favourite!`, 'success');
		}
		else {
			showMessage(`Removed from favourite list!`, 'success');
		}
	}

	const sendMessage = async (msg) =>{
		const response = await fetch(`/api/server/chat/send-message`, {
			method: 'POST',
			body: JSON.stringify({
				sessionId: data.sessionId,
				conversationId: conversationId,
				message: msg,
				userId: userId,
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
		const resp = await response.text();
		console.log(`message sent: `, JSON.stringify(resp, null, 2));
		const sentMessage = JSON.parse(resp);
		messageInput.value = "";
		if(!sentMessage) {
			showMessage(`Unable to send message!`, 'error', true, 3500);
		}
	}

	const loadMessages = async (conversationId) => {
		const response = await fetch(`/api/server/chat/conversation-messages?conversationId=${conversationId}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		const resp = await response.text();
		console.log(`messages loaded: `, JSON.stringify(resp, null, 2));
		const temp = JSON.parse(resp);
		_messages = await getDateSegregatedMessages(temp);

		messageContainer.scrollTop = messageContainer.scrollHeight;
	}

</script>

<!-- <div class="card card-compact card-bordered w-[375px] h-[590px]  bg-base-100 border-slate-200 rounded-none rounded-t-[44px] shadow-sm"> -->
	<div class="card-body ">
		<!-- <button class=" h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" /> -->
		<div class="gap-2 flex items-center justify-center mb-2">
			{#if conversation.profileImage != srcUrl}
				<Image cls="rounded-full justify-center align-middle" h="58" w="58" source={conversation.profileImage} ></Image>
			{:else}
				<img src="/assets/images/chat/png/account-img-1.png" width="54" height="54" class="justify-center col-span-1 align-middle" alt="" />
			{/if}
			<span class="items-center py-4 ">
				<h2 class=" text-[#5b7aa3] font-bold text-base align-middle">
					{`${conversation.firstName} ${conversation.lastName}`}
				</h2>
			</span>
			<button on:click|preventDefault={toggleFavourite}>
				{#if conversation.favourite}
					<img class="text-right" src="/assets/images/quiz-wrong/svg/correct.svg" alt="" />
				{:else}
					<img class="text-right" src="/assets/images/quiz-wrong/png/correct-light-grey.png" alt="" />
				{/if}
			</button>
		</div>
		<div class=" h-[455px] overflow-auto scrollbar-medium" bind:this={messageContainer}>
			{ #if messages.length == 0 }
				<h3 class="text-center font-medium mt-2">
					No messages here!
				</h3>
				<br/><br/>
				<h4 class="text-center font-normal">
					Start the conversation by sending first message!
				</h4>
			{:else}
				{#each messages as md }
					<p class="flex text-xs justify-center mb-3 mt-3">{md.dateStr}</p>
						{#each md.messagesForTheDay as message}
							{#if message.SenderId !== userId}
								<div class="grid grid-cols-6 gap-4">
									<div class="mb-3 relative bg-[#dfe7fd] rounded-lg pt-3 pl-3 pr-3 pb-1 col-start-1 col-span-5">
										<p class="text-left text-slate-700 mb-2">{message.Message}</p>
										<p class="text-right text-slate-600 text-xs">{(new Date(message.UpdatedAt)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
									</div>
								</div>
							{:else}
								<div class="grid grid-cols-6 gap-4">
									<div class="mb-3 relative bg-[#5b7aa3] rounded-lg pt-3 pl-3 pr-3 pb-1 col-start-2 col-span-5">
										<p class="text-left text-white mb-2">{message.Message}</p>
										<p class="text-right text-slate-300 text-xs">{(new Date(message.UpdatedAt)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
									</div>
								</div>
							{/if}
						{/each}
				{/each}
			{/if}
		</div>

		<!-- <div class=" h-[440px] overflow-auto scrollbar-medium "></div>
		<p class="flex text-xs  justify-center ">09 Dec 2021</p>
		<div class="grid grid-flow-col mb-3">
			<img src="/assets/chat-individual/png/jasmine.png" alt="" />
			<div class="ml-2">
				<h3 class="text-left mb-1">Jasmine Doe</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /><br />Aenean eu quam
					fermentum risus varius pellentesque scelerisque at velit. Nulla et convallis nunc.
				</p>
			</div>
		</div> -->

	</div>
<!-- </div> -->

<div class="h-[90px] w-[375px] bg-white">
	<div class="h-20 w-[375px] mt-3 bg-[#dfe7fd] flex ">
		<textarea
			id="messageText"
			name="messageText"
			bind:this={messageInput}
			class="h-[52px] p-3 ml-3 mt-3  w-[277px] rounded-lg bg-white"
			placeholder="Start typing here…"
		/>
			<div class="relative h-[50px] w-[50px] bg-[#5b7aa3] rounded-lg ml-3 mt-3"
				on:click={onSendMessageClick}
				on:keypress={async (e) => onSendMessageKeyPressed(e)}>
				<img class="m-3" src="/assets/images/ask-sneha/png/send.png" alt="" />
			</div>
	</div>
</div>
