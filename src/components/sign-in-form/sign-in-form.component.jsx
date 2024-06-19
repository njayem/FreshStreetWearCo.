import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	SignInContainer,
	ButtonsContainer,
} from "../sign-in-form/sign-in-form.styles.jsx";
import FormInput from "../form-input/form-input.component.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component.jsx";
import {
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase.utils";

const initialFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(initialFormFields);
	const { email, password } = formFields;
	const navigate = useNavigate();

	const resetFormFields = () => {
		return setFormFields(initialFormFields);
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
		resetFormFields();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);

			resetFormFields();
			navigate("/shop");
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

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignInContainer>
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
				<ButtonsContainer>
					<Button type="submit">Sign In</Button>
					<Button
						buttonType={BUTTON_TYPE_CLASSES.google}
						type="button"
						onClick={signInWithGoogle}>
						Sign In With Google
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
