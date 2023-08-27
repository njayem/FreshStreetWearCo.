import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import {
	CartIconContainer,
	ShoppingIcon,
	ItemCountContainer,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

	// TOGGLE CART FUNCTION
	const toggleCart = () => {
		if (isCartOpen) {
			setIsCartOpen(false);
		} else {
			setIsCartOpen(true);
		}
	};

	return (
		<CartIconContainer>
			<ShoppingIcon onClick={toggleCart} />
			<ItemCountContainer>{cartCount}</ItemCountContainer>
		</CartIconContainer>
	);
};

export default CartIcon;
