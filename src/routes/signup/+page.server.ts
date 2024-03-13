import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { db } from '$lib/server/db';
import { userTable } from '$lib/db/schema/user.schema';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const fullName = formData.get('fullName');
		const isMaleString = formData.get('isMale');

		if (!fullName || typeof fullName !== 'string') {
			return fail(400, {
				message: 'Name required'
			});
		}

		if (!email || typeof email !== 'string') {
			return fail(400, {
				message: 'Email requried'
			});
		}

		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		if (!isMaleString || typeof isMaleString !== 'string') {
			return fail(400, {
				message: 'Gender required'
			});
		}

		const isMale = isMaleString === 'true';

		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(password);

		const user = await db.query.userTable.findFirst({
			where: (users, { eq }) => eq(users.email, email)
		});

		if (user) {
			return fail(400, {
				message: 'Email already exits'
			});
		}

		await db.insert(userTable).values({
			id: userId,
			hashedPassword,
			email,
			fullName,
			isMale: !!isMale
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
