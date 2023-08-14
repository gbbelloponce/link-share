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
							src={$userData.photoURL || $authFirebaseUserData?.photoURL || 'default-user.png'}
							alt="Avatar"
						/>
					</div>
				{:else}
					<div class="w-6 rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
							/>
						</svg>
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
