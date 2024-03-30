import { ABLY_API_KEY } from '$env/static/private';

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
	const channel = await getChannel(channelName, ABLY_API_KEY);

	await channel.publish({
		data: {
			message,
			senderId,
			receiverId
		}
	});
};
