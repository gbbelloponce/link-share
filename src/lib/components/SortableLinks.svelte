<script lang="ts">
	import { flip } from 'svelte/animate';
	import { createEventDispatcher } from 'svelte';

	export let list: App.UserLink[] = [];

	// Starts at false but changes when the mouse drags a link
	let linkDragged: string | boolean = false;

	const dispatch = createEventDispatcher();

	const onDragStart = (e: DragEvent) => {
		const dragged = getParentNodeWithDataset(e.target as HTMLElement);
		e.dataTransfer?.setData('source', dragged?.index.toString());
	};

	const onDragOver = (e: DragEvent) => {
		const dragged = getParentNodeWithDataset(e.target as HTMLElement);
		linkDragged = dragged?.id ?? false;
	};

	const onDragLeave = (e: DragEvent) => {
		const dragged = getParentNodeWithDataset(e.target as HTMLElement);
		linkDragged === dragged.id && (linkDragged = false);
	};

	function onDrop(e: DragEvent) {
		linkDragged = false;
		const dragged = getParentNodeWithDataset(e.target as HTMLElement);
		reorder({
			from: e.dataTransfer?.getData('source'),
			to: dragged.index
		});
	}

	// It is used because maybe the user drags an HTMLElement without the dataset required
	// So recursively searches it from its parents
	const getParentNodeWithDataset = (node: HTMLElement): App.UserLink => {
		if (!node.dataset.index) {
			return getParentNodeWithDataset(node.parentNode as HTMLElement);
		} else {
			return {
				id: node.dataset.id,
				index: node.dataset.index,
				title: node.dataset.title,
				url: node.dataset.url,
				icon: node.dataset.icon
			} as App.UserLink;
		}
	};

	// Reorders the list of links given a 'from' and a 'to' index
	const reorder = ({ from, to }: any) => {
		const newList = [...list];
		newList[from] = [newList[to], (newList[to] = newList[from])][0];

		dispatch('sort', newList);
	};
</script>

<ul class="w-full max-w-sm list-none">
	{#each list as link, index (link.id)}
		<li
			class="w-full border-2 border-dashed transition-all"
			class:border-transparent={link.id !== linkDragged}
			data-index={index}
			data-id={link.id}
			draggable="true"
			on:dragstart={onDragStart}
			on:dragover|preventDefault={onDragOver}
			on:dragleave={onDragLeave}
			on:drop|preventDefault={onDrop}
			animate:flip={{ duration: 300 }}
		>
			<div class="my-2 group relative">
				<slot {link} />
			</div>
		</li>
	{/each}
</ul>
