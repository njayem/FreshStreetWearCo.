import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import {
	CartDropdownContainer,
	CartItemsContainer,
	EmptyMessageContainer,
} from "./cart-dropdown.styles.jsx";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState(true);

	const goToCheckoutHandler = () => {
		navigate("/checkout");
		setIsVisible(false);
	};

	if (!isVisible) {
		return null;
	}

	return (
		<CartDropdownContainer>
			<CartItemsContainer>
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} cartItem={cartItem} />
					))
				) : (
					<EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
				)}
			</CartItemsContainer>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
