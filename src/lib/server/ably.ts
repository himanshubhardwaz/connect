import { env } from '$env/dynamic/private';

import { getChannel } from '$lib/ably-client';

import type { message } from '$lib/store/chat';

export interface PublishMessageProps extends message {
	channelName: string;
}

export const publishMessage = async ({
	message,
	channelName,
	senderId,
	receiverId
}: PublishMessageProps) => {
	const channel = await getChannel(channelName, env.ABLY_API_KEY);

	await channel.publish({
		data: {
			message,
			senderId,
			receiverId
		}
	});
};
