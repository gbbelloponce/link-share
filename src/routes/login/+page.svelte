<script lang="ts">
	import { userData } from '$lib/data/userData';
	import { logInWithGoogle } from '$lib/api/auth';
	import { authFirebaseUserData } from '$lib/data/authFirebaseUserData';
</script>

{#if $authFirebaseUserData}
	<h2 class="card-title">Welcome,</h2>
	<span class="card-title text-success">{$authFirebaseUserData.displayName}</span>
	{#if !$userData}
		<a href="/login/username" class="btn btn-primary mt-2">Next Step</a>
	{:else}
		<a href="/" class="btn btn-primary mt-3">Go Home</a>
	{/if}
{:else}
	<button class="btn btn-primary" on:click={logInWithGoogle}>Log in with Google</button>
{/if}
