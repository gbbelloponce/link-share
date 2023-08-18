<script lang="ts">
	import '../app.css';
	import { userData } from '$lib/data/userData';
	import Alert from '$lib/components/Alert.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { authFirebaseUserData } from '$lib/data/authFirebaseUserData';

	$userData;
	$authFirebaseUserData;
</script>

<div class="min-h-screen flex flex-col">
	<Navbar />
	<Alert />
	<slot />
</div>
