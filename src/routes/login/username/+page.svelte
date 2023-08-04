<script lang="ts">
	import { doc, getDoc } from 'firebase/firestore';

	import { db } from '$lib/config/firebase';
	import AuthCheck from '$lib/components/AuthCheck.svelte';

	let username = '';
	let isLoading = false;
	let isUsernameAvailable = false;

	let debounceTimer: NodeJS.Timeout;

	const checkUsernameAvailability = async () => {
		if (!username) return (isUsernameAvailable = false);

		isUsernameAvailable = false;
		clearTimeout(debounceTimer);

		isLoading = true;
		debounceTimer = setTimeout(async () => {
			const ref = doc(db, 'usernames', username);
			const exists = await getDoc(ref).then((doc) => doc.exists());

			isUsernameAvailable = !exists;
			isLoading = false;
		}, 500);
	};

	const confirmUsername = async () => {};
</script>

<AuthCheck>
	<h2>Username</h2>
	<form class="w-2/5" on:submit|preventDefault={confirmUsername}>
		<input
			class="input w-full"
			type="text"
			placeholder="Username"
			bind:value={username}
			on:input={checkUsernameAvailability}
		/>

		{#if isLoading}
			<span class="my-3 loading loading-spinner text-primary" />
		{:else if !isUsernameAvailable}
			<p class="my-3 text-red-400">Username not available</p>
		{:else}
			<button class="my-3 btn btn-success">Confirm Username @{username}</button>
		{/if}
	</form>
</AuthCheck>
