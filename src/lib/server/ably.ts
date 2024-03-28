import { ABLY_API_KEY } from '$env/static/private';

import type { Types } from 'ably';
import Ably from 'ably';

let ably: Types.RealtimePromise | null = null;

export interface PublishMessageProps {
	msg: string;
	channelName: string;
	senderId: string;
	receiverId: string;
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
	msg,
	channelName,
	senderId,
	receiverId
}: PublishMessageProps) => {
	const channel = await getChannelByName(channelName);

	await channel.publish({
		name: channelName,
		data: {
			msg,
			senderId,
			receiverId
		}
	});
};
