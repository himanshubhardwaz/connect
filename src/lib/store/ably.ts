import { writable } from 'svelte/store';
import type { Types } from 'ably';

export type Ably = {
	connection: Types.ConnectionState;
};

export const ably = writable<Ably>();

export function updateAblyConnection(connection: Types.ConnectionState) {
	ably.set({ connection });
}
