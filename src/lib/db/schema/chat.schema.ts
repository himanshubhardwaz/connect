import { pgTable, text, timestamp, serial, boolean } from 'drizzle-orm/pg-core';
import { userTable } from './user.schema';

export const chatTable = pgTable('chats', {
	id: text('id').primaryKey(),
	userOneId: text('user_one_id').references(() => userTable.id),
	userTwoId: text('user_two_id').references(() => userTable.id),
	createdAt: timestamp('created_at').defaultNow()
});

export const messageTable = pgTable('messages', {
	id: serial('id').primaryKey(),
	chatId: text('chat_id')
		.notNull()
		.references(() => chatTable.id),
	message: text('message').notNull(),
	senderId: text('sender_id')
		.notNull()
		.references(() => userTable.id),
	receiverId: text('receiver_id')
		.notNull()
		.references(() => userTable.id),
	isDeleted: boolean('is_deleted').default(false),
	createdAt: timestamp('created_at').defaultNow()
});

/*
    1. user clicks on find stranger button
    2. we check if there is a userid available in chat table
    3. if avialable we add userTwoId in that chat table and starts message
    4. else, we add a new entry in chatTable
    TODO: Handle race condition, probably explore db transaction
*/
