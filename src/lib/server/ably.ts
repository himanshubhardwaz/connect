import { ABLY_API_KEY } from '$env/static/private';

import type { Types } from 'ably';
import Ably from 'ably';

import type { message } from '$lib/store/chat';

let ably: Types.RealtimePromise | null = null;

export interface PublishMessageProps extends message {
	channelName: string;
}

export function getAbly() {
	if (!ably) ably = new Ably.Realtime.Promise(ABLY_API_KEY);
	return ably;
}

export async function getChannelByName(channel: string | undefined) {
	if (!channel) throw new Error('Channel name required to chat');
	return getAbly().channels.get(channel);
}

export const publishMessage = async ({
	message,
	channelName,
	senderId,
	receiverId
}: PublishMessageProps) => {
	const channel = await getChannelByName(channelName);

	await channel.publish({
		data: {
			message,
			senderId,
			receiverId
		}
	});
};
