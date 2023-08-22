import "./form-input.scss";

// WE ARE GENERICISING THE PROPS
// USING IDENTICAL NAMES FOR PROPS AND INPUT FIELDS
// WE ARE PASSING IN THE LABEL
const FormInput = ({ label, inputOptions }) => {
	return (
		<div className="group">
			<input
				className="form-input"
				// WE PASS IN THE OBJECT THAT CONTAINS ALL THE PROPS
				// THEN SPREAD IT OUT
				// THIS WILL AUTOMATICALLY MATCH THE INPUT FIELD
				// WITH THE RIGHT PROPS BECAUSE THEY HAVE THE IDENTICAL NAMES
				{...inputOptions}
			/>
			{/* If label exists, render the label */}
			{label && (
				<label
					// This is a string literal
					// The ${} contains the dynamic portion of the string
					// We can append whatever we want outside of the ${}
					className={`${
						inputOptions.value.length ? "shrink" : ""
					} form-input-label`}>
					{label}
				</label>
			)}
		</div>
	);
};

export default FormInput;
