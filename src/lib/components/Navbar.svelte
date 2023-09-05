<script>
	import { logOut } from '$lib/api/auth';
	import { userData } from '$lib/data/userData';
	import { authFirebaseUserData } from '../data/authFirebaseUserData';
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl" href="/">Link Share</a>
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<button class="btn btn-ghost btn-circle avatar">
				{#if $userData}
					<div class="w-10 rounded-full">
						<img
							src={$userData.photoURL || $authFirebaseUserData?.photoURL || '/user.svg'}
							alt="Profile"
						/>
					</div>
				{:else}
					<div class="w-6 rounded-full">
						<img src="/user.svg" alt="Profile" />
					</div>
				{/if}
			</button>
			<ul
				class="mt-3 z-[10] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
			>
				{#if $userData}
					<li>
						<a href="/{$userData.username}">View Profile</a>
					</li>
					<li><a href="/{$userData.username}/edit">Edit Profile</a></li>
					<button class="mt-2 btn btn-error btn-sm" on:click={logOut}>Log Out</button>
				{:else if $authFirebaseUserData}
					<a class="mt-2 btn btn-primary btn-sm" href="/login">Complete Profile</a>
					<button class="mt-2 btn btn-error btn-sm" on:click={logOut}>Log Out</button>
				{:else}
					<a class="mt-2 btn btn-primary btn-sm" href="/login">Log In</a>
				{/if}
			</ul>
		</div>
	</div>
</div>
