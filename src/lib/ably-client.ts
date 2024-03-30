import { PUBLIC_ABLY_SUBSCRIBE_API_KEY } from '$env/static/public';
import Ably from 'ably';
import type { PublishMessageProps } from './server/ably';
import { addChat } from './store/chat';
import { type Types } from 'ably';

export const CHANNEL_CHAT_PREFIX = 'match';

let ably: Types.RealtimePromise | null = null;

export function getAbly(ABLY_API_KEY?: string) {
	if (!ably) ably = new Ably.Realtime.Promise(ABLY_API_KEY ?? PUBLIC_ABLY_SUBSCRIBE_API_KEY);
	return ably;
}

export async function getChannel(channel: string | undefined, ABLY_API_KEY?: string) {
	if (!channel) throw new Error('Channel name required to chat');
	return getAbly(ABLY_API_KEY).channels.get(channel);
}

export async function subsribeToChannel(
	channelName: string | undefined,
	currentUserId: string | undefined
) {
	if (!channelName || !currentUserId)
		throw new Error('Channel name and or current user id required, when subscribing to events');
	const channel = await getChannel(channelName);
	await channel.attach();
	await channel.subscribe((message) => {
		const data = message.data as PublishMessageProps;
		if (data.receiverId === currentUserId) addChat(data);
	});
}

export async function subscribeToChatChanges(channelName: string | undefined) {
	// TODO - add join/leave events, typing...
	if (!channelName) throw new Error('Channel name required, when subscribing to chat changes');
}

export async function unsubcribeFromChannel(channelName: string | undefined) {
	if (!channelName) throw new Error('Channel name required, when subscribing to events');
	const channel = await getChannel(channelName);
	channel.detach();
}
