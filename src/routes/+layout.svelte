<script>
	import '../app.css';
	import Toast from '$lib/components/toast.svelte';
	import { ToastPosition, showToast, ToastType } from '$lib/store/toast';
</script>

<Toast />
<slot />
