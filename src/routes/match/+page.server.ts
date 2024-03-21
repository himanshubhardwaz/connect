import { db } from '$lib/server/db';
import { generateId } from 'lucia';
import { redirect } from '@sveltejs/kit';
import { chatTable } from '$lib/db/schema/chat.schema';
import { eq } from 'drizzle-orm';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const userId = event.locals.user?.id;

		if (!userId) redirect(302, '/login');

		// Check if there is row where userOne or userTwo Id is null
		const chatIdToJoin = await db.transaction(async (tx) => {
			const foundEmptyChat = await tx.query.chatTable.findFirst({
				where: (chat, { or, and, isNull, isNotNull }) =>
					or(
						and(isNull(chat.userOneId), isNotNull(chat.userTwoId)),
						and(isNotNull(chat.userOneId), isNull(chat.userTwoId))
					)
			});

			if (!foundEmptyChat) {
				const chatId = generateId(15);
				tx.insert(chatTable).values({
					id: chatId,
					userOneId: userId
				});
				return chatId;
			}

			const isUserOneEmpty = !!foundEmptyChat.userOneId;

			if (isUserOneEmpty)
				tx.update(chatTable).set({ userOneId: userId }).where(eq(chatTable.id, foundEmptyChat.id));
			else
				tx.update(chatTable).set({ userTwoId: userId }).where(eq(chatTable.id, foundEmptyChat.id));

			return foundEmptyChat.id;
		});

		redirect(302, `/match/${chatIdToJoin}`);
	}
};
