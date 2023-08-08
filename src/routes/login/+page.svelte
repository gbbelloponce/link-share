<script lang="ts">
	import { authFirebaseUserData } from '$lib/data/authFirebaseUserData';
	import { logInWithGoogle, logOut } from '$lib/api/auth';
</script>

{#if $authFirebaseUserData}
	<h2 class="card-title">Welcome,</h2>
	<span class="card-title text-success">{$authFirebaseUserData.displayName}</span>
	<button class="btn btn-secondary mt-3" on:click={logOut}>Log out</button>
{:else}
	<button class="btn btn-primary" on:click={logInWithGoogle}>Log in with Google</button>
{/if}
