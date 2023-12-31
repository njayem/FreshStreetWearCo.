// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from "firebase/firestore";

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
	additionalInformation = {} //default value is an empty object
) => {
	if (!userAuth) return;
	// WE CERATE A REFERENCE TO THE USER DOCUMENT
	// INSIDE THE FIRESTORE DATABASE
	const userDocRef = doc(db, "users", userAuth.uid);
	//console.log(userDocRef);

	// WE GET THE USER DOCUMENT USING THE FIRESTORE DATABASE REFERENCE
	const userSnapshot = await getDoc(userDocRef);
	// console.log(userSnapshot);
	// console.log(userSnapshot.exists());

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

// ********* 5. signInAuthUserWithEmailAndPassword *********
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	// THIS METHOD TAKES (auth, email, password)
	// UNLIKE THE (signInWithGooglePopup) METHOD
	// WHICH TAKES (auth, googleProvider)
	return await signInWithEmailAndPassword(auth, email, password);
};
// ********* 5. signInAuthUserWithEmailAndPassword *********

// ********* 6. signOut *********
export const signOutUser = async () => {
	await signOut(auth);
};
// ********* 6. signOut *********

// ********* 7. onAuthStateChanged *********
export const onAuthStateChangedListener = (callback) => {
	// onAuthStateChanged calls the callback function
	// every time the authentication state (auth) changes
	// (user logs in or logs out)
	// Once (auth) changes, the callback function is called
	// and the user object is passed as an argument
	// which is done automatically by the onAuthStateChanged method

	// Calling the onAuthStateChanged method
	// automatically created a listener for us
	// and sets the next property to this callback fn
	// listenerModel = {
	//   next: callback,
	//   error: "",
	//   complete: ""
	// }
	onAuthStateChanged(auth, callback);
};
// ********* 7. onAuthStateChanged *********

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

// ********* 8. addCollectionAndDocuments *********
export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
	// We can use field instead of directly using the property name
	// to make this fucniton generic
	// field
) => {
	// WE CREATE A COLLECTION REFERENCE
	const collectionRef = collection(db, collectionKey);
	// console.log(collectionRef);

	// WE CREATE A BATCH
	// A BATCH IS A WAY TO BATCH OUR CALLS TO THE FIRESTORE DATABASE
	// SO THAT IF ANY OF OUR CALLS FAIL, NONE OF THEM WILL EXECUTE
	// ATOMICITY --> ALL OR NOTHING
	// WE CAN ALSO USE BATCHES TO PERFORM MULTIPLE OPERATIONS
	// AT THE SAME TIME (WRITE, UPDATE, DELETE) AS A SINGLE TRANSACTION
	const batch = writeBatch(db);

	// WE LOOP THROUGH THE OBJECTS TO ADD ARRAY
	// AND CREATE A NEW DOCUMENT REFERENCE
	// FOR EACH OBJECT
	objectsToAdd.forEach((object) => {
		// WE CREATE A NEW DOCUMENT REFERENCE FOR EACH OBJECT (Category)
		const docRef = doc(collectionRef, object.title.toLowerCase());

		// Generic way to create a new document reference
		// const docRef = doc(collectionRef, object[field].toLowerCase());

		// WE ADD THE NEW DOCUMENT REFERENCE TO THE BATCH
		batch.set(docRef, object);
	});

	// WE COMMIT THE BATCH
	return await batch.commit();
};
// ********* 8. addCollectionAndDocuments *********

// ********* 9. convertCollectionsSnapshotToMap *********
export const getCategoriesAndDocuments = async () => {
	const categoriesRef = collection(db, "categories");

	const q = query(categoriesRef);
	const querySnapshot = await getDocs(q);

	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});
	return categoryMap;
};
// ********* 9. convertCollectionsSnapshotToMap *********
