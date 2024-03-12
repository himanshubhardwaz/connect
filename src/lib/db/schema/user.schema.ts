import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { db } from '../db.sever';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';

export const userTable = pgTable('users', {
	id: text('id').primaryKey(),
	fullName: text('full_name').notNull(),
	email: text('email').notNull().unique(),
	isEmailVerified: boolean('is_email_verified').default(false),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	hashedPassword: text('hashed_password')
});

export const sessionTable = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
