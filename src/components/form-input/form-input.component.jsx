import {
	FormInputLabel,
	Input,
	Group,
} from "../form-input/form-input.styles.jsx";

// WE ARE GENERICISING THE PROPS
// USING IDENTICAL NAMES FOR PROPS AND INPUT FIELDS
// WE ARE PASSING IN THE LABEL
const FormInput = ({ label, inputOptions }) => {
	return (
		<Group>
			<Input
				// WE PASS IN THE OBJECT THAT CONTAINS ALL THE PROPS
				// THEN SPREAD IT OUT
				// THIS WILL AUTOMATICALLY MATCH THE INPUT FIELD
				// WITH THE RIGHT PROPS BECAUSE THEY HAVE THE IDENTICAL NAMES
				{...inputOptions}
			/>
			{/* If label exists, render the label */}
			{label && (
				<FormInputLabel shrink={inputOptions.value.length}>
					{label}
				</FormInputLabel>
			)}
		</Group>
	);
};

export default FormInput;
