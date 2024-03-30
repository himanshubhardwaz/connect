import { writable } from 'svelte/store';

export type Modal =
	| {
			title: string;
			descrition: string;
			onOk: () => void;
			okText: string;
			onCancle: () => void;
			cancleText: string;
	  }
	| undefined;

export const modal = writable<Modal>(undefined);

export function showModal(modalArgs: Modal) {
	modal.set(modalArgs);
}

export function closeModal() {
	modal.set(undefined);
}
