// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

// Instantiate the database
export const db = getFirestore();

// Every user has a document in the users collection
// userDocRef is a reference to that user document
// it is a pointer to that document
export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);
	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log("Error creating user", error.message);
		}
	}
	return userDocRef;
};
