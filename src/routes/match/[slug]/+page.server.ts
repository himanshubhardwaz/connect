import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { chatTable, messageTable } from '$lib/db/schema/chat.schema';
import { eq, type InferSelectModel } from 'drizzle-orm';
import { fail, json, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const load: PageServerLoad = async (event) => {
	const senderId = event.locals.user?.id;

	const chatId = event.params.slug;

	const chat = await db.query.chatTable.findFirst({
		where: (ct) => eq(ct.id, chatId)
	});

	const receiverId = chat?.userOneId === senderId ? chat?.userTwoId : chat?.userOneId;

	let messages: Array<InferSelectModel<typeof messageTable>> = [];

	if (!chat?.expired) {
		messages = await db.select().from(messageTable).where(eq(messageTable.chatId, chatId));
	}

	return { chat, messages, senderId, receiverId };
};

export const actions: Actions = {
	'send-message': async (event) => {
		try {
			const chatId = event.params.slug;

			const formData = await event.request.formData();
			const message = formData.get('message');
			const senderId = formData.get('senderId');
			const receiverId = formData.get('receiverId');

			if (
				typeof message !== 'string' ||
				typeof receiverId !== 'string' ||
				typeof senderId !== 'string'
			) {
				return fail(400, {
					message: 'Invalid data'
				});
			}

			await db.insert(messageTable).values({
				chatId,
				message,
				senderId,
				receiverId
			});

			json(200, {
				statusText: 'Success'
			});
		} catch (error: unknown) {
			const typedError = error as Error;
			return fail(400, {
				message: `Something went wrong, could not send message ${dev ? typedError.message : null}`
			});
		}
	},
	'leave-chat': async (event) => {
		try {
			const chatId = event.params.slug;

			await db.update(chatTable).set({ expired: true }).where(eq(chatTable.id, chatId));

			redirect(302, '/');
		} catch (error) {
			const typedError = error as Error;
			return fail(400, {
				message: `Something went wrong, could not leave chat ${dev ? typedError.message : null}`
			});
		}
	}
};
