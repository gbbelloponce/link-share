<script lang="ts">
	import { userData } from '$lib/data/userData';
	import UserLink from '$lib/components/UserLink.svelte';
</script>

<h2 class="card-title mb-5">Links</h2>

{#if $userData?.links}
	<ul class="w-full max-w-sm list-none">
		{#each $userData.links as link}
			<li class="my-2">
				<UserLink {...link} />
			</li>
		{/each}
	</ul>
{/if}
