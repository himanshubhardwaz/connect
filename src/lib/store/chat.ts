import { writable } from 'svelte/store';
import { messageTable } from '$lib/db/schema/chat.schema';
import type { InferSelectModel } from 'drizzle-orm';

export type message = InferSelectModel<typeof messageTable>;

export const chats = writable<Array<message>>([]);

export function initChat(initChats: Array<message> | undefined) {
	if (initChats) chats.set(initChats);
}

export function addChat(chat: message) {
	chats.update((prevState) => [...prevState, chat]);
}
