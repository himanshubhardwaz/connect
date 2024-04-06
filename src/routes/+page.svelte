<script lang="ts">
	import { enhance } from '$app/forms';
	let connectLoading = false;
	let signOutLoading = false;
</script>

<div
	class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8"
>
	<h1 class="text-4xl text-white font-bold mb-8 text-center">Welcome to ChatZone!</h1>

	<p class="text-lg text-gray-300 mb-10 text-center">
		Connect with strangers based on shared interests and start interesting conversations!
	</p>

	<form
		class="mb-4"
		method="post"
		use:enhance={() => {
			signOutLoading = true;
			return async ({ update }) => {
				await update();
				signOutLoading = false;
			};
		}}
	>
		<button
			class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
		>
			{signOutLoading ? 'Signing out...' : 'Sign out'}
		</button>
	</form>

	<form
		method="post"
		action="/match"
		use:enhance={() => {
			connectLoading = true;
			return async ({ update }) => {
				await update();
				connectLoading = false;
			};
		}}
	>
		<button
			class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
			disabled={connectLoading}
		>
			{connectLoading ? 'Connecting...' : 'Connect'}
		</button>
	</form>
</div>
