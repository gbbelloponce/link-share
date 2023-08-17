<script lang="ts">
	import { doc, updateDoc } from 'firebase/firestore';
	import { db } from '$lib/config/firebase';
	import { userData } from '$lib/data/userData';
	import { authFirebaseUserData } from '$lib/data/authFirebaseUserData';

	const toggleProfileStatus = async () => {
		const userRef = doc(db, 'users', $authFirebaseUserData!.uid);
		await updateDoc(userRef, {
			public: !$userData?.public
		});
	};
</script>

{#if $userData}
	<h2 class="card-title mb-5">General Settings</h2>
	<form class="form-control w-full max-w-xs">
		<label class="label" for="username">
			<span class="label-text">Username</span>
		</label>
		<input
			id="username"
			name="username"
			disabled
			bind:value={$userData.username}
			type="text"
			placeholder="Type here"
			class="input"
		/>
		<label class="label justify-center" for="username">
			<span class="label-text-alt">(Usernames cannot be changed)</span>
		</label>

		<div
			class="mt-5 tooltip flex justify-center gap-3"
			data-tip="If it is public, the world can see your profile"
		>
			<label for="profile-status">{$userData.public ? 'Public' : 'Private'} Profile</label>
			<input
				id="profile-status"
				name="profile-status"
				type="checkbox"
				class="toggle toggle-success"
				checked={$userData.public}
				on:change={toggleProfileStatus}
			/>
		</div>
	</form>
{/if}
