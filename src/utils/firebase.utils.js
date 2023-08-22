// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

// Instantiate the database
export const db = getFirestore();

// ********* 1. signInWithGooglePopup *********
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
// ********* 1. signInWithGooglePopup *********

// ********* 2. signInWithGoogleRedirect *********
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);
// ********* 2. signInWithGoogleRedirect *********

// ********* 3. createAuthUserWithEmailAndPassword *********
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	// THIS METHOD TAKES (auth, email, password)
	// UNLIKE THE (signInWithGooglePopup) METHOD
	// WHICH TAKES (auth, googleProvider)
	return await createUserWithEmailAndPassword(auth, email, password);
};
// ********* 3. createAuthUserWithEmailAndPassword *********

// ********* 4. createUserDocumentFromAuth *********
// Every user has a document in the users collection
// userDocRef is a reference to that user document
// it is a pointer to that document
// WE GET userAuth from calling any of the 2 google methods above
// FOR THE 3RD METHOD WE CAN STILL USE IT BUT WE HAVE TO
// SPREAD OUT ANY ADDITIONAL INFORMATION IN OUR FORMS
// IN ORDER TO STORE IT INSIDE THE USER DOCUMENT
export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;
	// WE CERATE A REFERENCE TO THE USER DOCUMENT
	// INSIDE THE FIRESTORE DATABASE
	const userDocRef = doc(db, "users", userAuth.uid);
	console.log(userDocRef);

	// WE GET THE USER DOCUMENT USING THE FIRESTORE DATABASE REFERENCE
	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	// IF THE USER DOCUMENT DOES NOT EXIST
	// WE DESCTRUCTURE THE userAuth OBJECT
	// WHICH WE GET FROM CALLING (signInWithGooglePopup)
	// AND WE CREATE A NEW USER DOCUMENT BY CALLING (setDoc)
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				// SPREAD THE ADDITIONAL INFORMATION INSIDE THE USER DOCUMENT
				...additionalInformation,
			});
		} catch (error) {
			console.log("Error creating user", error.message);
		}
	}
	// WE RETURN THE USER DOCUMENT REFERENCE
	// WHICH NOW POINTS TO AN ACTUAL USER DOCUMENT
	// INSIDE THE FIRESTORE DATABASE
	return userDocRef;
};
// ********* 4. createUserDocumentFromAuth *********

// ********* USER AUTHENTICATION & USER DOCUMENT RECAP *********
// ALL 3 METHODS
// 1. (signInWithGooglePopup)
// 2. (signInWithGoogleRedirect)
// 3. (createAuthUserWithEmailAndPassword)
// RETURN A PROMISE WHICH IS BASICALLY AN OBJECT
// WE CAN THEN DESTRUCTURE THE user OBJECT FROM THIS RESPONSE
// AND USE IT TO CREATE A USER DOCUMENT INSIDE OUR FIRESTORE DATABASE
// 4. BY CALLING THE (createUserDocumentFromAuth) FUNCTION
// WHICH TAKES THE user OBJECT AS AN ARGUMENT
// AND RETURNS A REFERENCE TO THE USER DOCUMENT INSIDE OUR FIRESTORE DATABASE
// WHICH CONTAINS THE user OBJECT DATA
// ********* USER AUTHENTICATION & USER DOCUMENT RECAP *********
