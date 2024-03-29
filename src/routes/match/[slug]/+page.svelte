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
	<p class="text-red-500 text-lg">Chat Expired</p>
{:else}
	<ul>
		{#each $chats as msg}
			<li>
				From: {msg.senderId} <br />
				To: {msg.receiverId} <br />
				Message: {msg.message}
			</li>
		{/each}
	</ul>
{/if}

<form method="post" action="?/send-message" use:enhance>
	<label for="message">Message</label>
	<input name="message" id="message" required /><br />
	<input name="receiverId" id="receiverId" value={data.receiverId} type="hidden" />
	<input name="senderId" id="senderId" value={data.senderId} type="hidden" />
	<input name="msgId" id="msgId" value={data.messages.length + 1} type="hidden" />
	<button disabled={data.chat?.expired} on:click={onSendChatButtonClick}>Continue</button>
</form>

<form method="post" action="?/leave-chat" use:enhance>
	<button disabled={data.chat?.expired}>Leave</button>
</form>
