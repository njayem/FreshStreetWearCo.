import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
	// auth,
	signInWithGooglePopup,
	// signInWithGoogleRedirect,
	createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

import SignUp from "../../components/sign-up/sign-up.component";

const SignIn = () => {
	// Run this function (ONCE) when the component mounts
	// useEffect(() => {
	// 	async function getRedirectResultFromAuth() {
	// 		const response = await getRedirectResult(auth);
	// 		if (response) {
	// 			const userDocRef = await createUserDocumentFromAuth(response.user);
	// 		}
	// 	}
	// }, []);

	// We are using the signInWithGooglePopup function to
	// sign in with Google and log the response to the console
	const logGoogleUser = async () => {
		// Deconstruct the user object from the response
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
		console.log("User:", user);
	};

	return (
		<div>
			<h1>I am the Sign In Page!</h1>
			<button onClick={logGoogleUser}>Sign In With Google Popup</button>
			{/* <button onClick={signInWithGoogleRedirect}>
			Sign In With Google Redirect
			</button> */}
			<SignUp />
		</div>
	);
};

export default SignIn;
