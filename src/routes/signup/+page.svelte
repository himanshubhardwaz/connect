<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="sm:mx-auto sm:w-full sm:max-w-md">
	<h2 class="mt-6 text-center text-3xl font-extrabold text-white">Sign up for an account</h2>
</div>

<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	<div class="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
		<form class="space-y-6" method="post" use:enhance>
			<div>
				<label for="email" class="block text-sm font-medium text-white"> Email address </label>
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
			</div>

			<div>
				<label for="fullName" class="block text-sm font-medium text-white"> Full Name </label>
				<div class="mt-1">
					<input
						id="fullName"
						name="fullName"
						type="text"
						autocomplete="name"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-700
                        rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                        focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
			</div>

			<div>
				<label for="isMale" class="block text-sm font-medium text-white"> Gender </label>
				<div class="mt-1">
					<select
						id="isMale"
						name="isMale"
						class="appearance-none block w-full px-3 py-2 border border-gray-700
                        rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                        focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					>
						<option value="true">Male</option>
						<option value="false">Female</option>
						<option value="other">Other</option>
					</select>
				</div>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-white"> Password </label>
				<div class="mt-1">
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="new-password"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-700
                        rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                        focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="w-full flex justify-center py-2 px-4 border border-transparent
                    rounded-md shadow-sm text-sm font-medium text-white
                    bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Sign up
				</button>
			</div>

			<div class="text-sm text-center text-gray-400">
				<p>
					Already have an account? <a href="/login" class="text-indigo-400 hover:text-indigo-300"
						>Sign in</a
					>
				</p>
			</div>
		</form>
	</div>
</div>
