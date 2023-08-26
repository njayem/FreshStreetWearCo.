import { createContext, useState, useEffect } from "react";

// ************* HELPER FUNCTION ************* //
// Define a HELPER FUNCTION that searches for a product
// in the cartItems array
const addCartItem = (cartItems, productToAdd) => {
	// ********* IF THE CARTITEM EXISTS ********* //
	// Find if cartItems contains the productToAdd
	// If found, return the cartItem object
	const existingCartItem = cartItems.find((cartItem) => {
		return cartItem.id === productToAdd.id;
	});
	// If found, increment the quantity
	// WE NEVER WANT TO MUTATE STATE DIRECTLY
	// SO WE USE THE MAP FUNCTION TO CREATE A NEW ARRAY
	if (existingCartItem) {
		// Note: we have to do the quality check again because
		// we want to use .map() to create a new array
		// so we have to go and look for the cartItem again
		// so we can return a new array with the updated quantity
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? {
						...cartItem,
						quantity: cartItem.quantity + 1,
				  }
				: cartItem
		);
	}
	// ********* IF THE CARTITEM EXISTS ********* //

	// ********* IF THE CARTITEM DOESNT EXISTS ********* //
	// Else, return a new array with the new cartItem object
	// Create a new array and spread over (copy over) the
	// existing cartItems array (the old one) and we add to it
	// a new object that represents the new cartItem
	return [...cartItems, { ...productToAdd, quantity: 1 }];
	// ********* IF THE CARTITEM DOESNT EXISTS ********* //
};
// ************* HELPER FUNCTION ************* //

// Create the context
export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0,
});

/*
product {
  id,
  name,
  price
  imageUrl,
}

cartItem {
  id,
  name,
  price,
  imageUrl,
  quantity
}
*/

// Create the provider
export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	// ********* USE EFFECT ********* //
	// Whenever the cartItems array changes, we want to update
	// the cartCount
	useEffect(() => {
		const newCartCount = cartItems.reduce((total, cartItem) => {
			return total + cartItem.quantity;
		}, 0);
		setCartCount(newCartCount);
	}, [cartItems]);
	// ********* USE EFFECT ********* //

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};
	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		cartCount,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
