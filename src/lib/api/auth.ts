import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from '../config/firebase';

export const logInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	await signInWithPopup(auth, provider);
};

export const logOut = async () => {
	await signOut(auth);
};
