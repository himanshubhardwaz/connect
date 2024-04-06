import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { db } from '$lib/server/db';
import { z } from 'zod';

import type { Actions } from './$types';

const LoginFormSchema = z.object({
	email: z.string().email({ message: 'Enter a valid email' }),
	password: z
		.string()
		.min(6, { message: 'Password should be atleast 6 charaters long' })
		.max(20, { message: 'Password length must not increase 20 characters' })
});

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const loginFormUserInput = {
			email: formData.get('email'),
			password: formData.get('password')
		};
		const safeParse = LoginFormSchema.safeParse(loginFormUserInput);

		if (!safeParse.success) {
			return fail(400, { issues: safeParse.error.issues });
		}

		const { email, password } = safeParse.data;

		const existingUser = await db.query.userTable.findFirst({
			where: (users, { eq }) => eq(users.email, email)
		});

		if (!existingUser) {
			return fail(400, {
				error: 'Incorrect email and/or password'
			});
		}

		const validPassword = await new Argon2id().verify(existingUser.hashedPassword, password);

		if (!validPassword) {
			return fail(400, {
				error: 'Incorrect email and/or password'
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
