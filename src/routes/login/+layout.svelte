<script lang="ts">
	import { page } from '$app/stores';
	import AnimatedRoute from '$lib/components/AnimatedRoute.svelte';
</script>

<svelte:head>
	<title>Log In</title>
</svelte:head>

<nav class="flex justify-center my-5">
	<ul class="steps">
		<a href="/login" class="step step-primary">Log In</a>
		<a href="/login/username" class="step" class:step-primary={$page.route.id?.match(/username/g)}>
			Create Username
		</a>
	</ul>
</nav>

<AnimatedRoute>
	<main class="card w-11/12 sm:w-4/6 bg-neutral text-neutral-content mx-auto">
		<div class="card-body items-center text-center">
			<slot />
		</div>
	</main>
</AnimatedRoute>
