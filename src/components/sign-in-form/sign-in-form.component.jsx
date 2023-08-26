import { useState } from "react";

import "./sign-in-form.styles.scss";

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";

import {
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase.utils";

// Create a formFields state object to store the form field values
// This is the initial state of the formFields object
const initialFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(initialFormFields);
	const { email, password } = formFields;

	// We are using the useContext hook to get access to the value
	// We then destruct the property we want from the value object
	// const { setCurrentUser } = useContext(UserContext);

	// ********* 0. resetFormFields *********
	const resetFormFields = () => {
		return setFormFields(initialFormFields);
	};
	// ********* 0. resetFormFields *********

	// ********* 00. signInWithGoogle *********
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
	const signInWithGoogle = async () => {
		// Deconstruct the user object from the response
		await signInWithGooglePopup();

		//setCurrentUser(user);
	};
	// ********* 00. resetFormFields *********

	// ********* 1. handleSubmit (Auth + DB Document) *********
	// This is a GENERIC handleChange function that
	// will work for ALL form fields
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			// Once we have the USER AUTH OBJECT from the response
			// We call setCurrentUser and pass in the user object
			// This will update the currentUser state in the UserContext
			//setCurrentUser(user);
			//console.log("setCurrentUser: ", user);

			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/invalid-email":
					alert("Please enter a valid email address");
					break;
				case "auth/user-disabled":
					alert("This user has been disabled");
					break;
				case "auth/user-not-found":
					alert("No user found with this email address");
					break;
				case "auth/wrong-password":
					alert("Incorrect password");
					break;
				default:
					console.log(error);
					alert("Something went wrong");
			}
		}
	};
	// ********* 1. handleSubmit (Auth + DB Document) *********

	// ********* 2. handleChange (state) *********
	// This will be a GENERIC handleChange function that will
	// update the formFields state object with the name and value
	// of the input field that is being changed
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};
	// ********* 2. handleChange (state) *********

	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
			<span>Sign In with your Email and Password!</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					inputOptions={{
						required: true,
						name: "email",
						value: email,
						type: "email",
						onChange: handleChange,
					}}
				/>

				<FormInput
					label="Password"
					inputOptions={{
						required: true,
						name: "password",
						value: password,
						type: "password",
						onChange: handleChange,
					}}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button buttonType="google" type="button" onClick={signInWithGoogle}>
						Sign In With Google
					</Button>
				</div>
			</form>
		</div>
	);
};
export default SignInForm;
