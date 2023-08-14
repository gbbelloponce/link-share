<script lang="ts">
	import type { PageData } from './$types';
	import UserLink from '$lib/components/UserLink.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>@{data.username}</title>
	<meta name="description" content={data.bio} />
</svelte:head>

<main class="prose w-full md:max-w-2xl text-center mx-auto mt-5 flex flex-col gap-4">
	<h1 class="text-3xl font-bold text-purple-500">@{data.username}</h1>

	<img src={data.photoURL} alt="photoURL" width="256" height="256" class="mx-auto rounded-lg" />

	<p class="text-xl">{data.bio ?? 'no bio yet...'}</p>

	<ul class="list-none p-2 mx-1">
		{#each data.links as link}
			<li>
				<UserLink {...link} />
			</li>
		{/each}
	</ul>
</main>
