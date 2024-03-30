<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { subsribeToChannel, unsubcribeFromChannel } from '$lib/ably-client';
	import { onMount, tick } from 'svelte';
	import { CHANNEL_CHAT_PREFIX } from '$lib/ably-client';
	import { initChat, chats, addChat } from '$lib/store/chat';
	import { generateId } from 'lucia';
	import { showModal, closeModal } from '$lib/store/modal';

	export let data: PageData;

	$: lastMessageInView = true;

	function leaveChat() {
		closeModal();
		const form = document.querySelector('#leave-chat-form') as HTMLFormElement;
		form.submit();
	}

	function handleLeaveChatButtonClicked() {
		showModal({
			cancleText: 'Dont leave',
			okText: 'Leave',
			descrition: 'If you leave this chat will be closed and you cannot join this chat again',
			onOk: leaveChat,
			onCancle: closeModal,
			title: 'Leave Chat'
		});
	}

	function handleScroll() {
		console.log('running this...');
		const container = document.querySelector('#chat-area');
		if (!container) return;

		const lastMessage = container.querySelector('ul > li:last-child');
		if (!lastMessage) return;

		const rect = lastMessage.getBoundingClientRect();
		lastMessageInView = rect.bottom <= container.getBoundingClientRect().bottom;
	}

	function scrollToBottom() {
		const container = document.querySelector('#chat-area');
		if (container) {
			const lastMessage = container.querySelector('ul > li:last-child');
			if (lastMessage) {
				lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
				lastMessageInView = true;
			}
		}
	}

	function optimisticallyUpdateMessage() {
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
	}

	onMount(() => {
		const container = document.querySelector('#chat-area');
		if (container) {
			container.addEventListener('scroll', handleScroll);
			handleScroll();
		}

		const unsubscribe = chats.subscribe(() => {
			tick().then(() => {
				scrollToBottom();
			});
		});

		initChat(data.messages);
		const chatId = data?.chat?.id;
		const channelName = `${CHANNEL_CHAT_PREFIX}-${chatId}`;
		void subsribeToChannel(channelName, data.senderId);

		return () => {
			if (container) {
				container.removeEventListener('scroll', handleScroll);
			}
			void unsubcribeFromChannel(channelName);
			unsubscribe();
		};
	});
</script>

<div
	class="h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative"
>
	<div
		class="max-w-lg w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden flex-grow h-[calc(100vh-64px)] mb-16 overflow-y-auto"
		id="chat-area"
	>
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
		{#if !lastMessageInView}
			<button
				class="fixed bottom-32 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-2 shadow-lg rounded-lg select-none"
				on:click={scrollToBottom}
			>
				Scroll or Click to see new messages
			</button>
		{/if}
	</div>

	<div class="bg-white p-4 flex items-center justify-between h-16 fixed bottom-0 left-0 right-0">
		<form
			method="post"
			action="?/send-message"
			on:submit={optimisticallyUpdateMessage}
			class="flex items-center space-x-4 flex-grow"
			use:enhance
		>
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

		<button
			type="submit"
			disabled={data.chat?.expired}
			class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none ml-4"
			on:click={handleLeaveChatButtonClicked}>Leave</button
		>

		<form method="post" action="?/leave-chat" id="leave-chat-form" />
	</div>
</div>
