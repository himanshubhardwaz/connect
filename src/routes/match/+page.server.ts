import { db } from '$lib/server/db';
import { lucia } from '$lib/server/auth';
import { redirect, fail } from '@sveltejs/kit';
import { chatTable } from '$lib/db/schema/chat.schema';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const userId = event.locals.user?.id;

		if (!userId) redirect(302, '/login');

		// Check if there is row where userOne or userTwo Id is null
	}
};
