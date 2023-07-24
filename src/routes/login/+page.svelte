<script lang="ts">
	import { logInWithGoogle } from '$lib/api/auth';
</script>

<h2>Login</h2>

<button class="btn btn-primary" on:click={logInWithGoogle}>Log In With Google</button>
