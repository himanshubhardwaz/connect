<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div
	class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8"
>
	<h1 class="text-4xl text-white font-bold mb-8">Welcome to ChatZone!</h1>

	<p class="text-lg text-gray-300 mb-10">
		Connect with strangers based on shared interests and start interesting conversations!
	</p>

	<form class="mb-4" method="post" use:enhance>
		<button
			class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
		>
			Sign out
		</button>
	</form>

	<form method="post" action="/match">
		<button
			class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
		>
			Connect
		</button>
	</form>

	<div class="mt-12 text-center text-gray-400">
		<p class="mb-4">Or, explore these topics:</p>
		<div class="flex justify-center mb-8">
			<button
				class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mr-4 shadow-md transition duration-300"
			>
				Technology
			</button>
			<button
				class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
			>
				Music
			</button>
		</div>

		<div class="text-left max-w-md mx-auto">
			<h2 class="text-xl font-semibold mb-4">Featured Users</h2>
			<div class="bg-white rounded-lg p-4 mb-4 shadow-md">
				<div class="flex items-center justify-between mb-2">
					<div class="flex items-center">
						<img
							src="https://randomuser.me/api/portraits/women/1.jpg"
							alt="User Avatar"
							class="w-10 h-10 rounded-full mr-2"
						/>
						<div>
							<p class="text-lg font-semibold">Sarah Johnson</p>
							<p class="text-sm text-gray-500">Web Developer</p>
						</div>
					</div>
					<button
						class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
					>
						Connect
					</button>
				</div>
				<p class="text-sm">Interested in: Technology, Photography, Travel</p>
			</div>

			<div class="bg-white rounded-lg p-4 mb-4 shadow-md">
				<div class="flex items-center justify-between mb-2">
					<div class="flex items-center">
						<img
							src="https://randomuser.me/api/portraits/men/2.jpg"
							alt="User Avatar"
							class="w-10 h-10 rounded-full mr-2"
						/>
						<div>
							<p class="text-lg font-semibold">John Doe</p>
							<p class="text-sm text-gray-500">Graphic Designer</p>
						</div>
					</div>
					<button
						class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
					>
						Connect
					</button>
				</div>
				<p class="text-sm">Interested in: Art, Music, Literature</p>
			</div>
		</div>

		<div class="text-left max-w-md mx-auto">
			<h2 class="text-xl font-semibold mb-4">Chat Preview</h2>
			<div class="bg-white rounded-lg p-4 mb-4 shadow-md">
				<div class="flex items-center justify-between mb-2">
					<div class="flex items-center">
						<img
							src="https://randomuser.me/api/portraits/women/3.jpg"
							alt="User Avatar"
							class="w-10 h-10 rounded-full mr-2"
						/>
						<p class="text-lg font-semibold">Emily</p>
					</div>
					<p class="text-sm text-gray-500">2m ago</p>
				</div>
				<p class="text-sm">
					Hey there! I saw you're interested in photography. Do you have any favorite photographers?
				</p>
			</div>

			<div class="bg-white rounded-lg p-4 mb-4 shadow-md">
				<div class="flex items-center justify-between mb-2">
					<div class="flex items-center">
						<img
							src="https://randomuser.me/api/portraits/men/4.jpg"
							alt="User Avatar"
							class="w-10 h-10 rounded-full mr-2"
						/>
						<p class="text-lg font-semibold">Alex</p>
					</div>
					<p class="text-sm text-gray-500">5m ago</p>
				</div>
				<p class="text-sm">
					Hello! Yes, I love the work of Ansel Adams. His black and white landscapes are amazing!
				</p>
			</div>
		</div>
	</div>
</div>
