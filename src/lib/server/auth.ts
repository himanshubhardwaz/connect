import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { adapter } from '$lib/server/db';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attr) => {
		return {
			email: attr.email
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		userId: number;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
}
