import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { db } from '$lib/server/db';
import { userTable } from '$lib/db/schema/user.schema';
import { z } from 'zod';

import type { Actions } from './$types';

const RegistrationFormSchema = z.object({
	fullName: z.string().min(1, { message: 'Full name is required' }),
	email: z.string().email({ message: 'Enter a valid email' }),
	password: z
		.string()
		.min(6, { message: 'Password should be atleast 6 charaters long' })
		.max(20, { message: 'Password length must not increase 20 characters' }),
	isMale: z
		.string()
		.refine((value) => value === 'true' || value === 'false', {
			message: 'Value must be a boolean'
		})
		.transform((value) => value === 'true')
});

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const userRegistrationInput = {
			email: formData.get('email'),
			password: formData.get('password'),
			fullName: formData.get('fullName'),
			isMale: formData.get('isMale')
		};

		const safeParse = RegistrationFormSchema.safeParse(userRegistrationInput);

		if (!safeParse.success) {
			return fail(400, { issues: safeParse.error.issues });
		}

		const { email, password, fullName, isMale } = safeParse.data;

		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(password);

		const user = await db.query.userTable.findFirst({
			where: (users, { eq }) => eq(users.email, email)
		});

		if (user) {
			return fail(400, {
				error: 'Email already exits',
				feild: 'email'
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
