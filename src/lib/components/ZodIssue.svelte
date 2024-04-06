<script lang="ts">
	import { zodIssues } from '$lib/store/zod-issues';

	export let feild: string;
</script>

{#each $zodIssues as { message, path }}
	{#if path[0] === feild}
		<p class="text-red-500 mt-1">
			{message}
		</p>
	{/if}
{/each}
