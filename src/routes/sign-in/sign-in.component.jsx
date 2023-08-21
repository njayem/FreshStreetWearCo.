import { signInWithGooglePopup } from "../../utils/firebase.utils";

const SignIn = () => {
	// We are using the signInWithGooglePopup function to
	// sign in with Google and log the response to the console
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
		console.log(response);
	};

	return (
		<div>
			<h1>I am the Sign In Page!</h1>
			<button onClick={logGoogleUser}>Sign In With Google Popup</button>
		</div>
	);
};

export default SignIn;
