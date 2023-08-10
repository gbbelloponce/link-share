<script lang="ts">
	import { doc, updateDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	import { userData } from '$lib/data/userData';
	import { db, storage } from '$lib/config/firebase';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { authFirebaseUserData } from '$lib/data/authFirebaseUserData';

	let previewURL: string;
	let isUploading = false;
	$: href = `/${$userData?.username}/edit`;

	const upload = async (e: any) => {
		isUploading = true;
		const file = e.target.files[0];
		previewURL = URL.createObjectURL(file);
		const storageRef = ref(storage, `users/${$authFirebaseUserData!.uid}/profile.png`);
		const result = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(result.ref);

		await updateDoc(doc(db, 'users', $authFirebaseUserData!.uid), { photoURL: url });
		isUploading = false;
	};
</script>

<AuthCheck>
	<h2 class="card-title">Upload a profile picture</h2>

	<form class="w-full">
		<div class="form-control w-full max-w-xs mx-auto text-center gap-3">
			<div>
				{#if isUploading}
					<span class="loading loading-spinner loading-lg text-primary" />
				{:else}
					<img
						src={previewURL || $userData?.photoURL}
						alt="photoURL"
						width="256"
						height="256"
						class="mx-auto"
					/>
				{/if}
			</div>
			<input
				on:change={upload}
				name="photoURL"
				type="file"
				class="file-input file-input-bordered w-full max-w-xs"
				accept="image/png, image/jpeg, image/gif, image/webp"
			/>
		</div>
	</form>

	{#if !isUploading && (previewURL || $userData?.photoURL)}
		<a {href} class="btn btn-success w-full md:w-1/3"> Finish </a>
	{/if}
</AuthCheck>
