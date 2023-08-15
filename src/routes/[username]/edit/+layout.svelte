<script lang="ts">
	import { page } from '$app/stores';
	import { userData } from '$lib/data/userData';
	import AnimatedRoute from '$lib/components/AnimatedRoute.svelte';
</script>

<svelte:head>
	<title>@{$page.params.username}</title>
</svelte:head>

<!-- Allows to edit current user's profile -->
{#if $userData && $page.params.username === $userData.username}
	<!-- Making tabs active when page route matches -->
	<div class="mx-auto tabs mb-5">
		<a
			href={`/${$userData.username}/edit`}
			class="tab tab-bordered"
			class:tab-active={$page.route.id?.match(/edit$/)}>General</a
		>
		<a
			href={`/${$userData.username}/edit/photo`}
			class="tab tab-bordered"
			class:tab-active={$page.route.id?.match(/edit\/photo/)}>Photo</a
		>
		<a
			href={`/${$userData.username}/edit/links`}
			class="tab tab-bordered"
			class:tab-active={$page.route.id?.match(/edit\/links/)}>Links</a
		>
	</div>
	<AnimatedRoute>
		<div class="card bg-neutral mx-auto w-11/12 sm:w-2/3 items-center text-center">
			<div class="card-body items-center w-full">
				<slot />
			</div>
		</div>
	</AnimatedRoute>
{:else}
	<div class="card bg-neutral mx-auto w-11/12 sm:w-2/3 items-center text-center">
		<div class="card-body">
			<p class="mb-3">You cannot edit other user's profile!</p>
			<a href="/" class="btn btn-primary">Go Home</a>
		</div>
	</div>
{/if}
