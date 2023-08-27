import {
	BaseButton,
	GoogleSignInButton,
	InvertedButton,
} from "../button/button.styles.jsx";

// 1. Default button
// 2. Google sign in button
// 3. Inverted button (Add to Cart)

// WE CREATE A BUTTON_TYPE_CLASSES OBJECT
// IF WE GET google, we render the google sign in button
// IF WE GET inverted, we render the inverted button
export const BUTTON_TYPE_CLASSES = {
	base: "base",
	google: "google-sign-in",
	inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
	({
		[BUTTON_TYPE_CLASSES.base]: BaseButton,
		[BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
		[BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
	}[buttonType]);

// WE ARE GENERECISING THE BUTTON COMPONENT
const Button = ({ children, buttonType, ...otherProps }) => {
	const CustomButton = getButton(buttonType);
	return (
		<CustomButton
			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
			{...otherProps}>
			{children}
		</CustomButton>
	);
};

export default Button;
