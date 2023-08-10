<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>@{data.username} Links</title>
	<meta name="description" content={data.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-5 flex flex-col items-center gap-4">
	<h1 class="text-3xl font-bold text-purple-500">@{data.username}</h1>

	<img src={data.photoURL} alt="photoURL" width="256" height="256" class="mx-auto rounded-lg" />

	<p class="text-xl">{data.bio ?? 'no bio yet...'}</p>
</main>
