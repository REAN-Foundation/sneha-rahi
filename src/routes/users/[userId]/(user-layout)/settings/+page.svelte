<script lang="ts">
	import type { PageServerData } from './$types';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import Confirm from '$lib/components/modal/confirm.svelte';
	import Image from '$lib/components/image.svelte';
	import { showMessage } from '$lib/utils/message.utils';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';

	export let data: PageServerData;
	let sessionId = data.sessionId;
	let userId = data.user.User.id;
	let profileImageUrl = data.user.ProfileImageUrl ?? undefined;
	let conversations = data.allConversations;
	let fileinput;

	$: avatarSource = profileImageUrl;

	const upload = async (imgBase64, filename) => {
		const data = {}
		//console.log(imgBase64);
        const imgData = imgBase64.split(',');
        data["image"] = imgData[1];
        //console.log(JSON.stringify(data));
        const res = await fetch(`/api/server/file-resources/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
				filename: filename,
            },
            body: JSON.stringify(data)
        });
		console.log(Date.now().toString());
		const response = await res.json();
		if (response.Status === 'success' && response.HttpCode === 201) {
			const imageResourceId = response.Data.FileResources[0].id;
			const profileImageUrl_ = response.Data.FileResources[0].Url;
			if (profileImageUrl_) {
				profileImageUrl = profileImageUrl_;
			}
			console.log(profileImageUrl);
			await updateProfileImage(imageResourceId);
		}
		else {
			showMessage(response.Message, 'error');
		}
	};

	const updateProfileImage = async (imageResourceId) => {
		const res = await fetch(`/api/server/user/update-profile-image`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
				imageResourceId: imageResourceId,
				userId: userId,
				sessionId: sessionId
			}),
        });
		const response = await res.json();
		console.log(JSON.stringify(response, null, 2));
		window.location.href = `/users/${userId}/settings`;
	};

    const onFileSelected = async (e) => {
        let f = e.target.files[0];
        const filename = f.name;
        let reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = async (e) => {
            avatarSource = e.target.result;
			await upload(e.target.result, filename);
        };
    }

	const onLogout = async () => {
		const response = await fetch(`/api/server/logout`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});
		const resp = await response.text();
		console.log(`resp: ${JSON.stringify(resp, null, 2)}`);
		LocalStorageUtils.removeItem('showSplash');
		window.location.href = '/sign-in';
	};

	const onDeleteAccount = async () => {
		const response = await fetch(`/api/server/user/delete-user`, {
			method: 'DELETE',
			body: JSON.stringify({
				userId: userId,
				sessionId: sessionId
			}),

			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('response', response);
		if (response.status === 200) {
			toast.success('Account deteted successfully!');
			goto(`/`);
		}
		else {
			toast.error('Unable to delete account!');

		}
	};

	const handleDeleteChat = async () => {
		for (const conversation of conversations) {
			await deleteConversation({
				sessionId: data.sessionId,
				conversationId: conversation.id
			});
		}
		toast.success('Chats deteted successfully!');
		goto(`/users/${userId}/chat`);
	};

	async function deleteConversation(model) {
		console.log('model', model);
		const response = await fetch(`/api/server/chat/delete-conversation`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('response', response);
	};

</script>

<!-- <div
	class="card card-compact card-bordered w-[375px] h-[701px] bg-base-100 border-slate-200 rounded-none rounded-t-[44px] shadow-sm"
> -->
	<div class="card-body ">
		<!-- <button class=" h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" /> -->
		<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
			SETTINGS
		</h2>

		<div class=" flex items-center justify-center flex-col">
			{#if avatarSource}
				<Image cls="flex h-24 w-24 rounded-full" source={avatarSource} w=24 h=24 />
				<!-- <img class="flex h-24 w-24 rounded-full" src={avatarSource} alt="d" /> -->
			{:else}
				<img
					class="h-24 w-24 rounded-full"
					src="/assets/images/my-profile/svg/my-profile-pic.svg"
					alt=""
				/>
			{/if}
			<button
				on:click={() => {
					fileinput.click();
				}}
				class="leading-2 tracking-[1px] text-lg font-semibold">EDIT</button
			>
			<input
				style="display:none"
				type="file"
				accept="image/png, image/jpeg"
				on:change={async (e)=> await onFileSelected(e)}
				bind:this={fileinput}
			/>

		</div>

		<div class="  grid grid-flow-row items-center justify-center">
			<a class="mt-5 " href="/users/{userId}/edit-profile">
				<button
					class="leading-none w-[300px] max-[375px]:w-64 h-[52px] rounded-[10px]  bg-[#5B7AA3] tracking-[1px] text-base text-white font-normal pl-3 pr-1 "
					>Edit Profile</button
				></a
			>

			{#if conversations.length > 0}
				<Confirm confirmTitle="Delete" cancelTitle="Cancel" let:confirm={confirmThis} on:delete = {async ()=> {
					await handleDeleteChat();
					}}>
					<button
						on:click={() => confirmThis()}
						class="leading-none w-[300px] max-[375px]:w-64 h-[52px] rounded-[10px] justify-center bg-[#5B7AA3] tracking-[1px] text-base text-white font-normal pl-3 mt-4"
						>Delete Chat</button
					>

					<span slot="title"> Delete </span>
					<span slot="description"> Are you sure you want to delete chats ? </span>
				</Confirm>
			{:else}
				<Confirm confirmTitle="Delete" cancelTitle="Cancel" let:confirm={confirmThis}>
					<button
						on:click={(e) => confirmThis()}
						class="leading-none w-[300px] max-[375px]:w-64 h-[52px] rounded-[10px] justify-center bg-[#5B7AA3] tracking-[1px] text-base text-white font-normal pl-3 mt-4"
						>Delete Chat</button
					>

					<span slot="title"> Delete </span>
					<span slot="description"> There is no any chat to delete ? </span>
				</Confirm>
			{/if}

			<button
				on:click={onLogout}
				class="leading-none w-[300px] max-[375px]:w-64 h-[52px] rounded-[10px]  bg-[#5B7AA3] tracking-[1px] text-base text-white font-normal  mt-5 "
				>Logout</button
			>

			<Confirm confirmTitle="Delete" cancelTitle="Cancel" let:confirm={confirmThis} on:delete = { ()=> {
				onDeleteAccount();
				}} >
				<button
					on:click={() => confirmThis()}
					class="leading-none w-[300px] max-[375px]:w-64 h-[52px] rounded-[10px]  bg-[#5B7AA3] tracking-[1px] text-base text-white font-normal mt-5 "
					>Delete Account</button
				>
				<span slot="title"> Delete </span>
				<span slot="description"> Are you sure you want to delete Account ? </span>
			</Confirm>
		</div>
	</div>
<!-- </div> -->
