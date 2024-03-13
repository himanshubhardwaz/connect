import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { db } from '$lib/db/db.sever';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (typeof email !== 'string' || !email) {
			return fail(400, {
				message: 'Invalid email'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const existingUser = await db.query.userTable.findFirst({
			where: (users, { eq }) => eq(users.email, email)
		});

		if (!existingUser) {
			return fail(400, {
				message: 'Incorrect email or password'
			});
		}

		const validPassword = await new Argon2id().verify(existingUser.hashedPassword, password);

		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect email or password'
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
