import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DATABASE_URL } from '$env/static/private';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { userTable, sessionTable } from './schema/user.schema';

const client = dev ? postgres(DATABASE_URL) : postgres(DATABASE_URL, { ssl: 'require' });

export const db = drizzle(client, {});

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
