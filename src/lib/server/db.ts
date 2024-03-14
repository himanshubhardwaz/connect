import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DATABASE_URL } from '$env/static/private';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import * as userSchema from '../db/schema/user.schema';
import { userTable, sessionTable } from '../db/schema/user.schema';
import { chatTable, messageTable } from '../db/schema/chat.schema';

const client = dev ? postgres(DATABASE_URL) : postgres(DATABASE_URL, { ssl: 'require' });

export const db = drizzle(client, {
	schema: { ...userSchema, ...sessionTable, ...chatTable, ...messageTable }
});

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
