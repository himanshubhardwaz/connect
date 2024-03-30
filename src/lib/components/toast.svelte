<script lang="ts">
	import { ToastPosition, ToastType, showToast, toasts } from '$lib/store/toast';
	import { fly } from 'svelte/transition';
	import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '$lib/icons/Toasts';
</script>

{#each $toasts as toast}
	<div
		class={`py-4 px-2 fixed z-50 ${toast.position === ToastPosition.TopLeft ? 'top-0 left-0' : ''} ${toast.position === ToastPosition.TopRight ? 'top-0 right-0' : ''} ${toast.position === ToastPosition.BottomLeft ? 'bottom-0 left-0' : ''} ${toast.position === ToastPosition.BottomRight ? 'bottom-0 right-0' : ''}`}
		transition:fly={{ y: 50, duration: 300 }}
	>
		{#if toast.type === ToastType.Success}
			<div
				class="flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2"
			>
				<div class="text-green-500 rounded-full bg-white mr-3">
					<SuccessIcon />
				</div>
				<div class="text-white max-w-xs" on:click={toast.onClick}>{toast.message}</div>
			</div>
		{:else if toast.type === ToastType.Info}
			<div
				class="flex items-center bg-blue-400 border-l-4 border-blue-700 py-2 px-3 shadow-md mb-2"
			>
				<div class="text-blue-500 rounded-full bg-white mr-3">
					<InfoIcon />
				</div>
				<div class="text-white max-w-xs" on:click={toast.onClick}>{toast.message}</div>
			</div>{:else if toast.type === ToastType.Warning}
			<div
				class="flex items-center bg-orange-400 border-l-4 border-orange-700 py-2 px-3 shadow-md mb-2"
			>
				<div class="text-orange-500 rounded-full bg-white mr-3">
					<WarningIcon />
				</div>
				<div class="text-white max-w-xs" on:click={toast.onClick}>{toast.message}</div>
			</div>{:else}
			<div class="flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2">
				<div class="text-red-500 rounded-full bg-white mr-3">
					<ErrorIcon />
				</div>
				<div class="text-white max-w-xs" on:click={toast.onClick}>{toast.message}</div>
			</div>{/if}
	</div>
{/each}
