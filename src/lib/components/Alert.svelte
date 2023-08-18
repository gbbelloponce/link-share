<script lang="ts">
	import { fade } from 'svelte/transition';
    import { alertStore } from "$lib/store/alertStore";
</script>

{#if $alertStore.show}
    <div
        class="absolute bottom-5 left-0 right-0 mx-auto flex justify-center items-center"
        transition:fade={{ delay: $alertStore.delay, duration: $alertStore.duration }}
    >
        <div class="flex justify-center w-11/12 sm:w-1/3 alert alert-{$alertStore.type}">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            >
            <span>{$alertStore.text}</span>
        </div>
    </div>
{/if}

