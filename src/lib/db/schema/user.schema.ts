import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
	id: text('id').primaryKey(),
	fullName: text('full_name').notNull(),
	email: text('email').notNull().unique(),
	isMale: boolean('is_male').default(true),
	isEmailVerified: boolean('is_email_verified').default(false),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	hashedPassword: text('hashed_password').notNull()
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

export const emailVerificationTable = pgTable('email-verification', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow()
});
