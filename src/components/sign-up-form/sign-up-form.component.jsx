import { useState } from "react";

import "./sign-up-form.styles.scss";

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

// Create a formFields state object to store the form field values
// This is the initial state of the formFields object
const initialFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(initialFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	// ********* 0. resetFormFields *********
	const resetFormFields = () => {
		return setFormFields(initialFormFields);
	};
	// ********* 0. resetFormFields *********

	// ********* 1. handleSubmit (Auth + DB Document) *********
	// This is a GENERIC handleChange function that
	// will work for ALL form fields
	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}
		// user refers to the userAuth object
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);
			// WE CALL THE createUserDocumentFromAuth FUNCTION HERE
			// TO CREATE A NEW USER DOCUMENT IN THE DATABASE
			// WE PASS THE userAuth OBJECT AS THE FIRST ARGUMENT
			// AND WE PASS THE displayName AS THE SECOND ARGUMENT
			// TO MAKE SURE THAT THE displayName IS STORED INSIDE THE
			// USER DOCUMENT
			console.log(user);
			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("Cannot create user. Email already in use");
			} else {
				console.log("User creation encountered an error: ", error);
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
			<h2>Don't have an account?</h2>
			<span>Sign Up with your Email and Password!</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					// WE CAN WRAP ALL THE OTHER PROPS IN A SINGLE OBJECT
					// AND PASS IT IN AS A SINGLE PROP
					// SINCE THE PROPS ARE IDENTICAL TO THE INPUT FIELDS
					inputOptions={{
						required: true,
						name: "displayName",
						value: displayName,
						type: "text",
						onChange: handleChange,
					}}
				/>

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

				<FormInput
					label="Confirm Password"
					inputOptions={{
						required: true,
						name: "confirmPassword",
						value: confirmPassword,
						type: "password",
						onChange: handleChange,
					}}
				/>

				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};
export default SignUpForm;
