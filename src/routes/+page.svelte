<script lang="ts">
	import { fade } from 'svelte/transition';
	
	import { page } from '$app/stores';
	import { userData } from '$lib/data/userData';

	let showSuccessAlert = false;

	const copyProfileLink = () => {
		navigator.clipboard.writeText(`${$page.url.origin}/${$userData!.username}`);
		showSuccessAlert = true;
		setTimeout(() => {
			showSuccessAlert = false;
		}, 3000);
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

{#if showSuccessAlert}
	<div
		class="absolute bottom-5 left-0 right-0 mx-auto flex justify-center items-center"
		transition:fade={{ delay: 250, duration: 300 }}
	>
		<div class="flex justify-center w-11/12 sm:w-1/3 alert alert-success">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>Copied to your clipboard!</span>
		</div>
	</div>
{/if}

<main class="flex-1">
	<div class="hero my-10">
		<div class="hero-content text-center">
			<div class="w-full">
				<h1 class="text-7xl font-bold">Link Share</h1>
				<p class="py-6 text-2xl">One simple link to share your entire portfolio</p>
				<div class="flex mx-auto w-full sm:w-4/5 justify-center items-center gap-5">
					{#if $userData}
						<a href="/{$userData.username}/edit" class="btn btn-primary">Edit Profile</a>
						<button on:click={copyProfileLink} class="btn btn-secondary">Copy Profile Link</button>
					{:else}
						<a href="/login" class="btn btn-primary">Log In</a>
						<a href="/gbbelloponce" class="btn btn-secondary">Example Profile</a>
					{/if}
				</div>
			</div>
		</div>
	</div>
</main>
