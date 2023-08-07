import { writable } from 'svelte/store';
import { db } from '../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

/**
 * @param path document path or reference
 * @returns a store with realtime updates on document data
 */
export const genericDocStore = <T>(path: string) => {
	let unsubscribe: () => void;

	const docRef = doc(db, path);
	const { subscribe } = writable<T | null>(null, (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			set((snapshot.data() as T) ?? null);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
};
