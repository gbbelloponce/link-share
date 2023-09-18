<script lang="ts">
	import { page } from '$app/stores';
	import { userData } from '$lib/data/userData';
	import { triggerAlert } from '$lib/helpers/alertHelper';

	const copyProfileLink = () => {
		navigator.clipboard.writeText(`${$page.url.origin}/${$userData!.username}`);
		triggerAlert('success', 'Copied to the clipboard!');
	};
</script>

<svelte:head>
	<title>Link Share - a place for links</title>
</svelte:head>

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

<footer class="absolute bottom-0 right-0 px-3 py-3">
	<a
		class="text-xs link"
		href="https://github.com/gbbelloponce/link-share/issues/new"
		target="_blank"
	>
		Send a Suggestion</a
	>
</footer>
