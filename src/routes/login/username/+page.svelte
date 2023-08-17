<script lang="ts">
	import { doc, getDoc, writeBatch } from 'firebase/firestore';

	import { db } from '$lib/config/firebase';
	import { userData } from '$lib/data/userData';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { authFirebaseUserData } from '$lib/data/authFirebaseUserData';

	let username = '';
	let isLoading = false;
	let isUsernameAvailable = false;

	let debounceTimer: NodeJS.Timeout;

	const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
	$: isUsernameValid = username?.length > 2 && username.length < 16 && re.test(username);
	$: isUsernameEmpty = username.length < 1;
	$: isUsernameTaken = isUsernameValid && !isUsernameAvailable && !isLoading;

	const checkUsernameAvailability = async () => {
		username = username.toLocaleLowerCase(); // Converts to lower case

		if (!isUsernameValid || isUsernameEmpty) return;

		isLoading = true;
		isUsernameAvailable = false;
		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(async () => {
			const ref = doc(db, 'usernames', username);
			const exists = await getDoc(ref).then((doc) => doc.exists());

			isUsernameAvailable = !exists;
			isLoading = false;
		}, 500);
	};

	const confirmUsername = async () => {
		if (!isUsernameAvailable || !isUsernameValid || isUsernameEmpty) return;

		isLoading = true;
		const batch = writeBatch(db);
		batch.set(doc(db, 'usernames', username), { uid: $authFirebaseUserData!.uid });
		batch.set(doc(db, 'users', $authFirebaseUserData!.uid), {
			username,
			photoURL: $authFirebaseUserData!.photoURL,
			public: true,
			bio: 'Hello there! Here are all my links',
			links: [
				{ title: 'Svelte', url: 'https://svelte.dev/', icon: 'custom' },
				{ title: 'Firebase', url: 'https://firebase.google.com/', icon: 'custom' }
			]
		});

		await batch.commit();

		isLoading = false;
	};
</script>

<AuthCheck>
	{#if $userData?.username}
		<h2 class="card-title">Your username is</h2>
		<span class="card-title text-success">@{$userData?.username}</span>
		<a href="/{$userData.username}/edit" class="btn btn-primary mt-3">Set Up profile</a>
	{:else}
		<form class="w-full max-w-xs" on:submit|preventDefault={confirmUsername}>
			<input
				class="input w-full"
				name="username"
				type="text"
				placeholder="Username"
				bind:value={username}
				on:input={checkUsernameAvailability}
				class:input-error={!isUsernameValid || isUsernameEmpty}
				class:input-warning={isUsernameTaken}
				class:input-success={isUsernameAvailable && isUsernameValid && !isLoading}
			/>
			<label class="label" for="username">
				{#if !isLoading && isUsernameValid && !isUsernameAvailable}
					<span class="label-text-alt text-warning">@{username} is not available</span>
				{/if}

				{#if !isLoading && !isUsernameValid}
					<span class="label-text-alt text-error"
						>must be 3-16 characters long, alphanumeric only</span
					>
				{/if}
			</label>

			{#if isLoading && !isUsernameEmpty && isUsernameValid}
				<button class="btn btn-success">
					<span class="loading loading-spinner" />
					Loading
				</button>
			{/if}

			{#if !isLoading && isUsernameAvailable && isUsernameValid}
				<button class="btn btn-success"
					>Confirm<span class="-ml-1 lowercase">@{username}</span></button
				>
			{/if}
		</form>
	{/if}
</AuthCheck>
