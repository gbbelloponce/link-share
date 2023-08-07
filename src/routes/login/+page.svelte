<script lang="ts">
	import { authFirebaseUserData } from '$lib/data/authFirebaseUserData';
	import { logInWithGoogle, logOut } from '$lib/api/auth';
</script>

{#if $authFirebaseUserData}
	<h2 class="card-title">Welcome, {$authFirebaseUserData.displayName}</h2>
	<p class="text-center text-success">You are logged in</p>
	<button class="btn btn-secondary" on:click={logOut}>Log out</button>
{:else}
	<button class="btn btn-primary" on:click={logInWithGoogle}>Log in with Google</button>
{/if}
