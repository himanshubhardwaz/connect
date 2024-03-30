import { writable } from 'svelte/store';
import { generateId } from 'lucia';

export enum ToastPosition {
	TopLeft = 'top-left',
	TopRight = 'top-right',
	BottomLeft = 'bottom-left',
	BottomRight = 'bottom-right'
}

export enum ToastType {
	Success = 'success',
	Error = 'error',
	Warning = 'warning',
	Info = 'info'
}

export type Toast = {
	id: string;
	message: string;
	onClick?: () => void;
	position: ToastPosition;
	type: ToastType;
};

export const toasts = writable<Array<Toast>>([]);

export function showToast(toastArgs: Omit<Toast, 'id'>) {
	const id = generateId(15);
	const toast: Toast = { ...toastArgs, id };
	toasts.update((prevToasts) => [...prevToasts, toast]);
	setTimeout(() => {
		closeToast(id);
	}, 2000);
}

export function closeToast(toastId: string) {
	toasts.update((prevToasts) => prevToasts.filter((t) => t.id !== toastId));
}
