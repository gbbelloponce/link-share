<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="flex justify-center my-6">
	<ul class="steps">
		<a href="/login" class="step step-primary">Log In</a>
		<a
			href="/login/username"
			class="step"
			class:step-primary={$page.route.id?.match(/username|photo/g)}
		>
			Choose Username
		</a>
		<a href="/login/photo" class="step" class:step-primary={$page.route.id?.match(/photo/g)}>
			Upload Photo
		</a>
	</ul>
</nav>

<main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
	<div class="card-body items-center text-center">
		<slot />
	</div>
</main>
