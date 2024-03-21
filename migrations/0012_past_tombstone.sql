ALTER TABLE "chats" ALTER COLUMN "user_one_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "user_two_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "chats" ADD COLUMN "expired" boolean DEFAULT false;