import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '../config/firebase';

export const logInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	const user = await signInWithPopup(auth, provider);
	console.log(user);
};
