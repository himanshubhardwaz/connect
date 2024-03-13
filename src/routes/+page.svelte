<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<p class="text-4xl text-blue-400">Currrently logged in</p>

<form method="post" use:enhance>
	<button>Sign out</button>
</form>
