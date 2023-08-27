import { useContext } from "react";

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

	// THE ( useNavigate() ) HOOK ALLOWS US TO GO TO A NE PAGE WHEN WE CLICK
	// ON A BUTTON
	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate("/checkout");
	};

	return (
		<CartDropdownContainer>
			<CartItemsContainer>
				{
					// IF THE CART IS EMPTY, WE RENDER THE EMPTY MESSAGE
					cartItems.length ? (
						cartItems.map((cartItem) => (
							<CartItem key={cartItem.id} cartItem={cartItem} />
						))
					) : (
						<EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
					)
				}
			</CartItemsContainer>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
