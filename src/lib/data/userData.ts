import { derived, type Readable } from 'svelte/store';

import { genericDocStore } from '../store/genericDocStore';
import { authFirebaseUserData } from './authFirebaseUserData';

export const userData: Readable<App.UserData | null> = derived(
	authFirebaseUserData,
	($authFirebaseUser, set) => {
		if ($authFirebaseUser) {
			return genericDocStore<App.UserData>(`users/${$authFirebaseUser.uid}`).subscribe(set);
		} else {
			set(null);
		}
	}
);
