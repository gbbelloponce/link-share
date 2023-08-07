<script lang="ts">
	import { authFirebaseUserData } from '$lib/data/authFirebaseUserData';
</script>

{#if $authFirebaseUserData}
	<slot />
{:else}
	<p class="text-error my-3">You must be logged in to view this page</p>
	<a class="btn btn-primary" href="/login">Log In</a>
{/if}
