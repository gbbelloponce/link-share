import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from '../config/firebase';

export const logInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	const user = await signInWithPopup(auth, provider);
	console.log(user);
};

export const logOut = () => {
	signOut(auth);
};
