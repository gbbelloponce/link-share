<script lang="ts">
	import { user } from '$lib/store/user';
</script>

{#if $user}
	<slot />
{:else}
	<p class="text-error my-10">
		You must be logged in to view this page
		<a class="btn btn-primary" href="/login">Log In</a>
	</p>
{/if}
