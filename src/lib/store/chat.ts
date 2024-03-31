import { writable, get } from 'svelte/store';
import { messageTable } from '$lib/db/schema/chat.schema';
import type { InferSelectModel } from 'drizzle-orm';
import type { Types } from 'ably';

export type message = InferSelectModel<typeof messageTable>;

export const chats = writable<Array<message>>([]);

export function initChat(initChats: Array<message> | undefined) {
	if (initChats) chats.set(initChats);
}

export function addChat(chat: message) {
	chats.update((prevState) => [...prevState, chat]);
}

export type ChatConfig =
	| {
			channelName?: string;
			channel?: Types.RealtimeChannelPromise;
			senderId?: string;
			receiverId?: string;
			isSenderConnected?: boolean;
			isReceiverConnected?: boolean;
	  }
	| undefined;

export const chatConfig = writable<ChatConfig>(undefined);

export function updateChatConfig(config: Partial<ChatConfig>) {
	chatConfig.update((currConfig) => ({ ...currConfig, ...config }));
}

export function getChatConfig() {
	return get(chatConfig);
}
