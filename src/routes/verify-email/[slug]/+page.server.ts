import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { fail, json } from '@sveltejs/kit';
import { emailVerificationTable } from '$lib/db/schema/user.schema';
import { eq } from 'drizzle-orm';
import { dev } from '$app/environment';

export const load: PageServerLoad = async (event) => {
	try {
		const mailVerificationId = event.params.slug;

		const verification = await db.query.emailVerificationTable.findFirst({
			where: (ct, { eq }) => eq(ct.id, mailVerificationId)
		});

		if (!verification) {
			return fail(400, {
				error: 'Invalid link'
			});
		}

		if (verification.isActive) {
			await db
				.update(emailVerificationTable)
				.set({ isActive: false })
				.where(eq(emailVerificationTable.id, verification.id));
		} else {
			return fail(400, {
				error: 'Verification email link expired.'
			});
		}

		json(200, {
			statusText: 'Success'
		});
	} catch (error) {
		return fail(500, {
			error: `Something went wrong verifying email address, pls try again later. ${dev ? error : ''}`
		});
	}
};
