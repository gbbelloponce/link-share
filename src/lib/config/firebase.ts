import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyD81IWicVk9Danv5ee7O2r593ZHyy7j2mo',
	authDomain: 'link-share-3ecc8.firebaseapp.com',
	projectId: 'link-share-3ecc8',
	storageBucket: 'link-share-3ecc8.appspot.com',
	messagingSenderId: '667856146107',
	appId: '1:667856146107:web:a04bad43822ac3ff50e39e'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
