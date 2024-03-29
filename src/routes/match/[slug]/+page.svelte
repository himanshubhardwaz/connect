<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { subsribeToChannel } from '$lib/ably-client';
	import { onMount } from 'svelte';
	import { CHANNEL_CHAT_PREFIX } from '$lib/ably-client';
	import { initChat, chats } from '$lib/store/chat';
	// import { generateId } from 'lucia';

	export let data: PageData;

	function onSendChatButtonClick() {
		/*
            TODO - Optimistic update
            const messageInput = document.getElementById('message') as HTMLInputElement;
            const receiverIdInput = document.getElementById('receiverId') as HTMLInputElement;
            const senderIdInput = document.getElementById('senderId') as HTMLInputElement;

            const message = messageInput.value;
            const receiverId = receiverIdInput.value;
            const senderId = senderIdInput.value;

            addChat({ 
                receiverId,
                senderId,
                message, 
                chatId: data.chat?.id ?? generateId(15), 
                id: data.messages.length + 1, 
                isDeleted: false, 
                createdAt: new Date()
            });
        */
	}

	onMount(async () => {
		initChat(data.messages);
		const chatId = data?.chat?.id;
		await subsribeToChannel(`${CHANNEL_CHAT_PREFIX}-${chatId}`);
	});
</script>

{#if data.chat?.expired}
	<div class="text-red-500 text-lg text-center my-4">Chat Expired</div>
{:else}
	<div class="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4">
		<ul class="divide-y divide-gray-200">
			{#each $chats as msg}
				<li class="p-4">
					{#if msg.senderId === data.senderId}
						<p class="text-gray-800"><span class="font-semibold">You:</span> {msg.message}</p>
					{:else}
						<p class="text-blue-600">
							<span class="font-semibold">Stranger:</span>
							{msg.message}
						</p>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}

<div class="max-w-lg mx-auto">
	<form method="post" action="?/send-message" class="flex items-center space-x-4" use:enhance>
		<input
			name="message"
			id="message"
			required
			class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
			placeholder="Type your message here"
		/>
		<input name="receiverId" id="receiverId" value={data.receiverId} type="hidden" />
		<input name="senderId" id="senderId" value={data.senderId} type="hidden" />
		<input name="msgId" id="msgId" value={data.messages.length + 1} type="hidden" />
		<button
			type="submit"
			disabled={data.chat?.expired}
			class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
			>Send</button
		>
	</form>

	<form method="post" action="?/leave-chat" class="my-4" use:enhance>
		<button
			type="submit"
			disabled={data.chat?.expired}
			class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
			>Leave Chat</button
		>
	</form>
</div>
