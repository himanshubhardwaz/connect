import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {env} from '$env/dynamic/private';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import * as userSchema from '$lib/db/schema/user.schema';
import * as chatSchema from '$lib/db/schema/chat.schema';
import { userTable, sessionTable } from '../db/schema/user.schema';

const client = dev ? postgres(env.DATABASE_URL) : postgres(env.DATABASE_URL, { ssl: 'require' });

export const db = drizzle(client, {
	schema: { ...userSchema, ...chatSchema }
});

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
