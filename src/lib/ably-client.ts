import { env } from '$env/dynamic/public';
import Ably from 'ably';
import type { PublishMessageProps } from './server/ably';
import { addChat, getChatConfig, updateChatConfig } from './store/chat';
import { updateAblyConnection } from './store/ably';
import { ToastPosition, ToastType, showToast } from './store/toast';
import { type Types } from 'ably';

export const CHANNEL_CHAT_PREFIX = 'match';

let ably: Types.RealtimePromise | null = null;

export function getAbly(ABLY_API_KEY?: string) {
	if (!ably) ably = new Ably.Realtime.Promise(ABLY_API_KEY ?? env.PUBLIC_ABLY_SUBSCRIBE_API_KEY);
	return ably;
}

export function getChannel(channelName: string | undefined, ABLY_API_KEY?: string) {
	if (!channelName) throw new Error('Channel name required to chat');

	let currChannel = getChatConfig()?.channel;
	const currChannelName = getChatConfig()?.channelName;
	if (currChannel && currChannelName === channelName) return currChannel;
	else {
		currChannel = getAbly(ABLY_API_KEY).channels.get(channelName);
		updateChatConfig({ channel: currChannel, channelName });
	}

	return currChannel;
}

export function subscribeToConnectionStateChanges() {
	const ably = getAbly();
	ably.connection.on((state) => {
		updateAblyConnection(state.current);
		let type: ToastType = ToastType.Info;
		if (state.current === 'connected') type = ToastType.Success;
		else if (
			state.current === 'suspended' ||
			state.current === 'closed' ||
			state.current === 'failed' ||
			state.current === 'disconnected'
		)
			type = ToastType.Error;

		showToast({
			message: state.current,
			position: ToastPosition.TopRight,
			type
		});
	});
}

export async function subsribeToChannel(
	channelName: string | undefined,
	currentUserId: string | undefined
) {
	if (!channelName || !currentUserId)
		throw new Error('Channel name and or current user id required, when subscribing to events');
	const channel = getChannel(channelName);
	if (channel) {
		await channel.attach();
		await channel.subscribe((message) => {
			const data = message.data as PublishMessageProps;
			if (data.receiverId === currentUserId) addChat(data);
		});
		await enterChannel(channelName, currentUserId);
	}
}

export async function enterChannel(channelName: string, userId: string) {
	await getChannel(channelName).presence.enterClient(userId);
}

export async function subscribeToChatChanges(channelName: string | undefined) {
	if (!channelName) throw new Error('Channel name required, when subscribing to chat changes');
	const channel = getChannel(channelName);
	await channel.presence.subscribe('enter', (member) => {
		if (member.clientId !== getChatConfig()?.senderId)
			updateChatConfig({ receiverId: member.clientId });
	});
	await channel.presence.subscribe('leave', () => {
		// if (member.clientId !== getChatConfig()?.senderId)
		// 	updateChatConfig({ receiverId: member.clientId });
	});
	await channel.presence.subscribe('update', () => {
		// if (member.clientId !== getChatConfig()?.senderId)
		// 	updateChatConfig({ receiverId: member.clientId });
	});
}

export function unsubcribeFromChannel(channelName: string | undefined) {
	if (!channelName) throw new Error('Channel name required, when subscribing to events');
	const ably = getAbly();
	ably.connection.off();
	const channel = getChannel(channelName);
	channel.presence.leave();
	channel.presence.unsubscribe('enter');
	channel.presence.unsubscribe('leave');
	channel.presence.unsubscribe('update');
	channel.detach();
	updateChatConfig(undefined);
}
