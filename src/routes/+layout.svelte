<script lang="ts">
	import '../app.css';
	import { userData } from '$lib/data/userData';
	import { authFirebaseUserData } from '$lib/data/authFirebaseUserData';

	$userData;
	$authFirebaseUserData;
</script>

<div class="min-h-screen flex flex-col">
	<slot />
</div>
