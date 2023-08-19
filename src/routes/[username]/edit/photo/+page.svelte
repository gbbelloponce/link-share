<script lang="ts">
	import { doc, updateDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	import { userData } from '$lib/data/userData';
	import { db, storage } from '$lib/config/firebase';
	import { authFirebaseUserData } from '$lib/data/authFirebaseUserData';

	let previewURL: string;
	let isUploading = false;

	const upload = async (e: Event) => {
		const file = (e.target as HTMLInputElement).files![0];
		previewURL = URL.createObjectURL(file);
		isUploading = true;
		const storageRef = ref(storage, `users/${$authFirebaseUserData!.uid}/profile.png`);
		const result = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(result.ref);
		await updateDoc(doc(db, 'users', $authFirebaseUserData!.uid), { photoURL: url });
		isUploading = false;
	};
</script>

<h2 class="card-title mb-5">Photo</h2>

<form class="w-full">
	<div class="form-control w-full max-w-sm mx-auto text-center gap-3">
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
			class="file-input file-input-bordered w-full max-w-xs mx-auto"
			accept="image/png, image/jpeg, image/gif, image/webp"
		/>
	</div>
</form>
