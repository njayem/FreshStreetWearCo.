import "./button.styles.scss";

// 1. Default button
// 2. Google sign in button
// 3. Inverted button (Add to Cart)

// WE CREATE A BUTTON_TYPE_CLASSES OBJECT
// IF WE GET google, we render the google sign in button
// IF WE GET inverted, we render the inverted button
const BUTTON_TYPE_CLASSES = {
	google: "google-sign-in",
	inverted: "inverted",
};

// WE ARE GENERECISING THE BUTTON COMPONENT
const Button = ({ children, buttonType, ...otherProps }) => {
	return (
		<button
			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
			{...otherProps}>
			{children}
		</button>
	);
};

export default Button;
