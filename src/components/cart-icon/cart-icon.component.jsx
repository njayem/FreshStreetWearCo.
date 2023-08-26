import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.scss";

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen } = useContext(CartContext);

	// TOGGLE CART FUNCTION
	const toggleCart = () => {
		if (isCartOpen) {
			setIsCartOpen(false);
		} else {
			setIsCartOpen(true);
		}
	};

	return (
		<div className="cart-icon-container">
			<ShoppingIcon className="shopping-icon" onClick={toggleCart} />
			<span className="item-count">0</span>
		</div>
	);
};

export default CartIcon;
