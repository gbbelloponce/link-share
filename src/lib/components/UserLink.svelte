<script>
	export let icon = 'custom';
	export let title = 'Svelte';
	export let url = 'https://svelte.dev/';
</script>

<a
	href={url}
	target="_blank"
	class="bg-base-200 no-underline rounded-lg p-3 flex justify-center items-center relative"
>
	<img src={`/icons/${icon}.svg`} alt={icon} width="32" height="32" class="w-8 absolute left-3" />
	<span class="text-lg text-white font-bold">{title}</span>
</a>
