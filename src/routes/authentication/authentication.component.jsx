import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { AuthenticationContainer } from "./authentication.styles.jsx";
const Authentication = () => {
	return (
		<AuthenticationContainer>
			{/* <button onClick={signInWithGoogleRedirect}>
			Sign In With Google Redirect
			</button> */}
			<SignInForm />
			<SignUpForm />
		</AuthenticationContainer>
	);
};

export default Authentication;
