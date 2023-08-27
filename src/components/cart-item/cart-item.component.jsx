import "./cart-item.styles.jsx";

import {
	CartItemContainer,
	ItemDetailsContainer,
} from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
	const { name, price, imageUrl, quantity } = cartItem;

	return (
		<CartItemContainer>
			<img src={imageUrl} alt={name} />
			<ItemDetailsContainer>
				<span>{name}</span>
				<span>
					{quantity} x ${price}
				</span>
			</ItemDetailsContainer>
		</CartItemContainer>
	);
};

export default CartItem;
