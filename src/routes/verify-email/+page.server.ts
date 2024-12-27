import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import sendVerificationMail from '$lib/server/utils/send-verification-mail';
import { generateId } from 'lucia';
import { emailVerificationTable } from '$lib/db/schema/user.schema';
import { db } from '$lib/server/db';
import { env } from '$env/dynamic/public';
import { dev } from '$app/environment';

export const actions: Actions = {
	'send-verfication-mail': async (event) => {
		try {
			if (!event.locals.user) redirect(302, '/login');

			const userId = event.locals.user.id;
			const userEmail = event.locals.user.email;

			const [verficationEmail] = await db
				.insert(emailVerificationTable)
				.values({
					id: generateId(15),
					userId
				})
				.returning();

			if (!verficationEmail) {
				throw new Error('Could not create verification email entry in db.');
			}

			sendVerificationMail({
				to: userEmail,
				verificationUrl: `${env.PUBLIC_BASE_URL}/verify-email/${verficationEmail.id}`
			});
		} catch (error) {
			let devmsg = error;
			if (error instanceof Error) devmsg = error.message;
			return fail(500, {
				error: `Something went wrong, could not send verfication mail at the moment. Pls try again later. ${dev ? devmsg : null}`
			});
		}
	}
};
