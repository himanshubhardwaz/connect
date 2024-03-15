import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { messageTable } from '$lib/db/schema/chat.schema';
import { eq } from 'drizzle-orm';
import { fail, json } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const load: PageServerLoad = async (event) => {
	const chatId = event.params.slug;

	const messages = await db.select().from(messageTable).where(eq(messageTable.chatId, chatId));

	return { chatId, messages };
};

export const actions: Actions = {
	default: async (event) => {
		try {
			const chatId = event.params.slug;

			const formData = await event.request.formData();
			const message = await formData.get('message');
			const receiverId = await formData.get('receiverId');
			const senderId = await formData.get('senderId');

			if (
				typeof message !== 'string' ||
				typeof receiverId !== 'string' ||
				typeof senderId !== 'string'
			) {
				return fail(400, {
					message: 'Email requried'
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
				message: `Something went wrong, could not send message ${dev ?? typedError.message}`
			});
		}
	}
};
