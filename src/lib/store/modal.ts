import { writable } from 'svelte/store';

export type Modal =
	| {
			title: string;
			description: string;
			onOk: () => void;
			okText: string;
			onCancel: () => void;
			cancelText: string;
	  }
	| undefined;

export const modal = writable<Modal>(undefined);

export function showModal(modalArgs: Modal) {
	modal.set(modalArgs);
}

export function closeModal() {
	modal.set(undefined);
}
