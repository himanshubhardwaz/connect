<script lang="ts">
	import { enhance } from '$app/forms';
	import { setZodIssues } from '$lib/store/zod-issues';
	import ZodIssue from '$lib/components/ZodIssue.svelte';
	import FormError from '$lib/components/FormError.svelte';
	export let form;

	let loading = false;

	let formError: string | undefined;
	let formErrorField: string | undefined = 'default';

	$: {
		setZodIssues(form?.issues);
		formError = form?.error;
		console.log({ formError });
	}
</script>

<div class="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<h2 class="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
			<form
				class="space-y-6"
				method="post"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						await update();
						loading = false;
					};
				}}
			>
				<div>
					<label for="email" class="block text-sm font-medium text-white">Email address </label>
					<div class="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							class="appearance-none block w-full px-3 py-2 border border-gray-700
                        rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                        focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<ZodIssue feild="email" />
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-white"> Password </label>
					<div class="mt-1" id="default">
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							class="appearance-none block w-full px-3 py-2 border border-gray-700
                        rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                        focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<ZodIssue feild="password" />
				</div>

				<div>
					<button
						type="submit"
						class="w-full flex justify-center py-2 px-4 border border-transparent
                    rounded-md shadow-sm text-sm font-medium text-white
                    bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						disabled={loading}
					>
						{loading ? 'Loading...' : 'Sign in'}
					</button>
				</div>

				<div class="text-sm text-center text-gray-400">
					<p>
						Dont have an account? <a href="/signup" class="text-indigo-400 hover:text-indigo-300"
							>Sign up</a
						>
					</p>
				</div>

				<FormError error={formError} field={formErrorField} />
			</form>
		</div>
	</div>
</div>
