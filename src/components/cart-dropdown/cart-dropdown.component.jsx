import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";

import "./cart-dropdown.scss";
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
		<div className="cart-dropdown-container">
			<div className="cart-items">
				{cartItems.map((cartItem) => (
					<CartItem key={cartItem.id} cartItem={cartItem} />
				))}
			</div>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;
