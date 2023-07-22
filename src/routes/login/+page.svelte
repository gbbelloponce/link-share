<script lang="ts">
	import { auth } from '$lib/config/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	const signInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		console.log(user);
	};
</script>

<h2>Login</h2>

<button class="btn btn-primary" on:click={signInWithGoogle}>Sign In With Google</button>
