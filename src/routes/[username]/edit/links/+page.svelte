<script lang="ts">
	import { writable } from 'svelte/store';
	import { doc, updateDoc, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';

	import { db } from '$lib/config/firebase';
	import { userData } from '$lib/data/userData';
	import UserLink from '$lib/components/UserLink.svelte';
	import SortableLinks from '$lib/components/SortableLinks.svelte';
	import { authFirebaseUserData } from '$lib/data/authFirebaseUserData';

	const icons = [
		'X',
		'Instagram',
		'YouTube',
		'TikTok',
		'Twitch',
		'LinkedIn',
		'GitHub',
		'OnlyFans',
		'Custom'
	];

	let showForm = false;
	const formDefaults = {
		icon: 'custom',
		title: '',
		url: 'https://'
	};
	const formData = writable({ ...formDefaults });

	$: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
	$: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
	$: formIsValid = urlIsValid && titleIsValid;

	const addLink = async () => {
		const userRef = doc(db, 'users', $authFirebaseUserData!.uid);
		await updateDoc(userRef, {
			links: arrayUnion({
				...$formData,
				id: Date.now().toString()
			})
		});

		formData.set({ ...formDefaults });
		showForm = false;
	};

	const deleteLink = async (link: App.UserLink) => {
		const userRef = doc(db, 'users', $authFirebaseUserData!.uid);
		await updateDoc(userRef, {
			links: arrayRemove(link)
		});
	};

	const cancelLink = () => {
		formData.set({ ...formDefaults });
		showForm = false;
	};

	const sortList = (e: CustomEvent<App.UserLink[]>) => {
		const newList = e.detail;
		const userRef = doc(db, 'users', $authFirebaseUserData!.uid);
		setDoc(userRef, { links: newList }, { merge: true });
	};
</script>

<h2 class="card-title mb-5">Links</h2>

{#if $userData?.links}
	<SortableLinks list={$userData.links} on:sort={sortList} let:link>
		<UserLink {...link} />
		<button
			on:click={() => deleteLink(link)}
			class="btn btn-xs btn-error invisible group-hover:visible transition-all absolute -right-5 -top-1"
			>Delete</button
		>
	</SortableLinks>
{/if}

{#if showForm}
	<form
		on:submit|preventDefault={() => addLink()}
		class="bg-base-200 p-3 flex flex-col w-full rounded-xl"
	>
		<div class="w-full flex flex-col lg:flex-row flex-wrap gap-3">
			<select name="icon" class="select select-sm" bind:value={$formData.icon}>
				{#each icons as icon}
					<option value={icon.toLowerCase()}>{icon}</option>
				{/each}
			</select>
			<input
				name="title"
				type="text"
				placeholder="Title"
				class="input input-sm flex-1"
				class:input-error={!titleIsValid}
				bind:value={$formData.title}
			/>
			<input
				name="url"
				type="text"
				placeholder="URL"
				class="input input-sm flex-1"
				class:input-error={!urlIsValid}
				bind:value={$formData.url}
			/>
		</div>
		<div class="w-full flex justify-between gap-3 my-5">
			<button type="button" class="btn btn-danger" on:click={cancelLink}>Cancel</button>
			<button disabled={!formIsValid} type="submit" class="btn btn-primary">Confirm</button>
		</div>
	</form>
{:else}
	<button on:click={() => (showForm = true)} class="btn btn-primary block mx-auto my-4"
		>Add a Link</button
	>
{/if}
