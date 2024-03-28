import { PUBLIC_ABLY_SUBSCRIBE_API_KEY } from '$env/static/public';
import Ably from 'ably';

export const CHANNEL_CHAT_PREFIX = 'match';

export async function subsribeToChannel(channelName: string | undefined) {
	if (!channelName) throw new Error('Channel name required, when subscribing to events');
	const ably = new Ably.Realtime.Promise(PUBLIC_ABLY_SUBSCRIBE_API_KEY);
	const channel = ably.channels.get(channelName);
	await channel.subscribe((message) => {
		console.log(JSON.stringify(message));
	});
}
