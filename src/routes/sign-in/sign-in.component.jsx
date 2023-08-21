import { signInWithGooglePopup } from "../../utils/firebase.utils";

import { createUserDocumentFromAuth } from "../../utils/firebase.utils";

const SignIn = () => {
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
		</div>
	);
};

export default SignIn;
