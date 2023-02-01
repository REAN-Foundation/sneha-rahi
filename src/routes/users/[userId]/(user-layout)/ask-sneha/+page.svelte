<script lang="ts">
	import type { PageServerData } from './$types';
	import { showMessage } from '$lib/utils/message.utils';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import Image from '$lib/components/image.svelte';
	import { getDateSegregatedMessages } from '../chat/[conversationId]/conversation.utils';
	const ENTER_KEY_CODE = 13;
	const MESSAGE_POLL_DURATION = 2500;
	export let data: PageServerData;
	const userId = $page.params.userId;
	const askSnehaUserId = data.otherUserId;
	const conversationId = data.conversationId;
	let _messages = data.messages;
	$: messages = _messages;
	let profileImage = data.profileImage;
	// let conversation = data.conversation;
	// console.log("conversation", conversation)
	$: conversation = conversation;
	let message_ = '';
	let queryResponseMsg = '';
	let messageInput; //Message input text area
	let messageContainer; //Message holding container
	let phone = data.user.User.Person.Phone;
	console.log('phone', phone);
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
		message_ = messageInput.value as string;
		console.log(message_);
		const msg = message_.trim();
		if (msg.length == 0) {
			return;
		}
		await sendMessage(msg, userId);
		await sendMessageToSneha(msg);
		await loadMessages(conversationId);
	};

	const onSendMessageKeyPressed = async (e) => {
		const keyCode = e.keyCode;
		if (keyCode == ENTER_KEY_CODE) {
			message_ = messageInput.value as string;
			console.log(message_);
			const msg = message_.trim();
			if (msg.length == 0) {
				return;
			}
			await sendMessage(msg, userId);
			await sendMessageToSneha(msg);
			await sendMessage(msg, userId);
		}
	};

	const sendMessageToSneha = async (msg) => {
		const response = await fetch(`/api/server/ask-sneha`, {
			method: 'POST',
			body: JSON.stringify({
				message: msg,
				phone: phone
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
		const resp = await response.text();
		console.log(`message sent: `, JSON.stringify(resp, null, 2));
		const sentMessage = JSON.parse(resp);
		console.log('sentMessage', sentMessage);
		queryResponseMsg = sentMessage.data.response_message;
		console.log('queryResponse : ', queryResponseMsg);
		await sendMessage(queryResponseMsg, askSnehaUserId);
		messageInput.value = '';
		if (!sentMessage) {
			showMessage(`Unable to send message!`, 'error', true, 3500);
		}
	};

	const sendMessage = async (msg, senderId) => {
		const response = await fetch(`/api/server/chat/send-message`, {
			method: 'POST',
			body: JSON.stringify({
				sessionId: data.sessionId,
				conversationId: conversationId,
				message: msg,
				senderId: senderId
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
		const resp = await response.text();
		console.log(`message sent: `, JSON.stringify(resp, null, 2));
		const sentMessage = JSON.parse(resp);
		messageInput.value = '';
		if (!sentMessage) {
			showMessage(`Unable to send message!`, 'error', true, 3500);
		}
	};

	const loadMessages = async (conversationId) => {
		const response = await fetch(
			`/api/server/chat/conversation-messages?conversationId=${conversationId}`,
			{
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				}
			}
		);
		const resp = await response.text();
		console.log(`messages loaded: `, JSON.stringify(resp, null, 2));
		const temp = JSON.parse(resp);
		_messages = await getDateSegregatedMessages(temp);

		messageContainer.scrollTop = messageContainer.scrollHeight;
	};
</script>

<!-- <div
	class="card card-compact card-bordered w-[375px] h-[590px] bg-base-100 border-slate-200 rounded-none rounded-t-[44px] shadow-sm"
> -->
<div class="card-body max-[425px]:w-full w-[375px]">
	<!-- <button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded handle" /> -->
	<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
		ASK SNEHA
	</h2>
	<div class="h-[500px] overflow-auto scrollbar-medium" bind:this={messageContainer}>
		<!-- <div class="grid grid-flow-col mb-4">
				<img src="/assets/images/ask-sneha/png/sneha.png" alt="" />
				<div>
					<h3 class="text-left mt-2 mb-1">SNEHA</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/><br/>Aenean eu quam
						fermentum risus varius pellentesque scelerisque at velit. Nulla et convallis nunc.
					</p>
				</div>
			</div> -->
		{#if messages.length == 0}
			<h3 class="text-center font-medium mt-6">Any Question ?</h3>
			<br />
			<h4 class="text-center font-normal">Start the conversation by sending your query !</h4>
		{:else}
			{#each messages as md}
				<!-- <div class="grid grid-flow-col  my-8 relative">
					<div class="mr-16 ">
						<h3 class="text-right mb-2">You</h3>
						<p class="text-right">
							{message_}
						</p>
					</div>
					<img class="absolute right-2 " src="/assets/images/ask-sneha/png/mask.png" alt="" />
				</div> -->
				<p class="flex text-xs justify-center mb-3 mt-3">{md.dateStr}</p>
				{#each md.messagesForTheDay as message}
					{#if message.SenderId == userId}
						<!-- <div class="grid grid-cols-6 gap-4">
									<div class="mb-3 relative bg-[#dfe7fd] rounded-lg pt-3 pl-3 pr-3 pb-1 col-start-1 col-span-5">
										<p class="text-left text-slate-700 mb-2">{message.Message}</p>
										<p class="text-right text-slate-600 text-xs">{(new Date(message.UpdatedAt)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
									</div>
								</div> -->
						<div class="grid grid-flow-col my-8 relative">
							<div class="mr-16 ">
								<h3 class="text-right mb-2">You</h3>
								<p class="text-right">
									{message.Message}
								</p>
								<!-- <p class="text-right text-slate-600 text-xs">{(new Date(message.UpdatedAt)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p> -->
							</div>
							{#if profileImage.includes(null)}
							   <img class="absolute right-2 " src="/assets/images/ask-sneha/png/mask.png" alt="" />
							{:else}
								<Image
									cls="rounded-full absolute right-2"
									h="40"
									w="40"
									source={profileImage}
								/>
							{/if}
						</div>
					{:else}
						<div class="grid grid-flow-col my-8 relative">
							<img class="absolute " src="/assets/images/ask-sneha/png/sneha.png" alt="" />
							<div class="ml-16">
								<h3 class="text-left mt-2 mb-2">SNEHA</h3>
								<p class="text-left">
									{message.Message}
								</p>
								<!-- <p class="text-left text-slate-600 text-xs">{(new Date(message.UpdatedAt)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p> -->
							</div>
						</div>
						<!-- <div class="grid grid-cols-6 gap-4">
							 <div
								class="mb-3 relative bg-[#5b7aa3] rounded-lg pt-3 pl-3 pr-3 pb-1 col-start-2 col-span-5"
							>
								<p class="text-left text-white mb-2">{message.Message}</p>
								<p class="text-right text-slate-300 text-xs">
									{new Date(message.UpdatedAt).toLocaleString('en-US', {
										hour: 'numeric',
										minute: 'numeric',
										hour12: true
									})}
								</p>
							</div> 
						</div> -->
					{/if}
				{/each}
			{/each}
		{/if}
		<!-- {#if queryResponse.length == 0}
			<div />
		{:else}
			<div class="grid grid-flow-col my-8">
				<img class="absolute" src="/assets/images/ask-sneha/png/sneha.png" alt="" />
				<div class="ml-16">
					<h3 class="text-left mt-2 mb-2">SNEHA</h3>
					<p class="text-left">
						{queryResponse}
					</p>
				</div>
			</div>
		{/if} -->
		<!-- <div class="grid grid-flow-col mb-4 relative">
				<div class=" mr-3">
					<h3 class="text-right  mb-1">You</h3>
					<p class="text-right">
						Lorem ipsum dolor sit amet, consectetur mauris non massa adipiscing elit.
					</p>
				</div>
				<img src="/assets/images/ask-sneha/png/mask.png" alt="" />
			</div> -->
		<!-- <div class="grid grid-flow-col mb-4">
				<img src="/assets/images/ask-sneha/png/sneha.png" alt="" />
				<div>
					<h3 class="text-left mt-2 mb-1">SNEHA</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /><br />Aenean eu quam
						fermentum risus varius pellentesque scelerisque at velit. Nulla et convallis nunc.
					</p>
				</div>
			</div> -->
	</div>
</div>
<!-- </div> -->
<div class="h-[90px] max-[425px]:w-full w-[375px] bg-white">
	<div class="h-20 max-[425px]:w-full w-[375px] mt-3 bg-[#dfe7fd] flex ">
		<textarea
			id="messageText"
			name="messageText"
			bind:this={messageInput}
			class="h-[52px] p-3 ml-3 mt-3 w-[277px] max-[425px]:w-full rounded-lg bg-white"
			placeholder="Start typing here…"
		/>
		<div
			class="relative h-[50px] w-[50px] max-[425px]:w-[60px] max-[425px]:mr-3 bg-[#5b7aa3] rounded-lg ml-3 mt-3"
			on:click={onSendMessageClick}
			on:keypress={async (e) => onSendMessageKeyPressed(e)}
		>
			<img
				class="m-3"
				src="/assets/images/ask
			-sneha/png/send.png"
				alt=""
			/>
		</div>
	</div>
</div>

<!-- </div> -->
