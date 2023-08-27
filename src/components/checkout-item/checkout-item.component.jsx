import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import {
	CheckoutItemContainer,
	BaseSpan,
	Quantity,
	Arrow,
	Value,
	RemoveButton,
	ImageContainer,
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ cartItem }) => {
	const { name, price, imageUrl, quantity } = cartItem;
	const { addItemToCart, removeItemFromCart, clearItemFromCart } =
		useContext(CartContext);

	// With this handler, we can pass in the cartItem
	// this provdies code clarity and reusability
	const clearItemHandler = () => {
		clearItemFromCart(cartItem);
	};

	const addItemHandler = () => {
		addItemToCart(cartItem);
	};

	const removeItemHandler = () => {
		removeItemFromCart(cartItem);
	};

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<BaseSpan>{name}</BaseSpan>
			<Quantity>
				<Arrow onClick={removeItemHandler}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>
			<BaseSpan>{price}</BaseSpan>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
