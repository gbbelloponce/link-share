import { derived, type Readable } from 'svelte/store';

import { genericDocStore } from '../store/genericDocStore';
import { authFirebaseUserData } from './authFirebaseUserData';

interface UserData {
	username: string;
	bio: string;
	photoURL: string;
	links: unknown[];
	public: boolean;
}

export const userData: Readable<UserData | null> = derived(
	authFirebaseUserData,
	($authFirebaseUser, set) => {
		if ($authFirebaseUser) {
			return genericDocStore<UserData>(`users/${$authFirebaseUser.uid}`).subscribe(set);
		} else {
			set(null);
		}
	}
);
