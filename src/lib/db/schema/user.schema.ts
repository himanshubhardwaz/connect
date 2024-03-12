import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
	id: serial('id').primaryKey(),
	fullName: text('full_name').notNull(),
	email: text('email').notNull().unique(),
	isEmailVerified: boolean('is_email_verified').default(false),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	hashedPassword: text('hashed_password')
});

export const forgotPassword = pgTable('forgot_password', {
	id: serial('id').primaryKey(),
	isUrlActive: boolean('is_url_active').default(true),
	userId: serial('user_id')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});
