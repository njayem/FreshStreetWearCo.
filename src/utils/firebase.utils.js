// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBrZOjyMOT71_4QdD5IUnKxC6dgSuDyKfc",
	authDomain: "fresh-streetwear-co-db.firebaseapp.com",
	projectId: "fresh-streetwear-co-db",
	storageBucket: "fresh-streetwear-co-db.appspot.com",
	messagingSenderId: "66525949132",
	appId: "1:66525949132:web:54fb7f94db3bde6cd2e669",
	measurementId: "G-BJ2ZGSGE34",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
