import { createContext, useState, useEffect } from "react";

// ************* HELPER FUNCTION -1- ************* //
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
// ************* HELPER FUNCTION -1- ************* //

// ************* HELPER FUNCTION -2- ************* //
const removeCartItem = (cartItems, cartItemToRemove) => {
	// Find the cartItem to be removed
	const existingCartItem = cartItems.find((cartItem) => {
		return cartItem.id === cartItemToRemove.id;
	});
	// Check if quantity = 1, if it is, remove the cartItem from the
	// cartItems array
	if (existingCartItem.quantity === 1) {
		// FILTER OUT (AND KEEP) EVERYHTING THAT EVALUATES TO
		// TRUE (!== in this case) INTO A NEW ARRAY
		return cartItems.filter((cartItem) => {
			// We do this because when it evaluates to true, it will
			// keep THAT cartItem in the array, menaing the item we're
			// removing will be removed from the array because we're
			// looking for everyhting tht doesnt match its id!
			return cartItem.id !== cartItemToRemove.id;
		});
	}

	// Otherwise return back a new array with the cartItem with the
	// updated quantity
	return cartItems.map((cartItem) => {
		return cartItem.id === cartItemToRemove.id
			? {
					...cartItem,
					quantity: cartItem.quantity - 1,
			  }
			: cartItem;
	});
};
// ************* HELPER FUNCTION -2- ************* //

// ************* HELPER FUNCTION -3- ************* //
const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter((cartItem) => {
		return cartItem.id !== cartItemToClear.id;
	});
};
// ************* HELPER FUNCTION -3- ************* //

// Create the context
export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
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
	const [cartTotal, setCartTotal] = useState(0);

	// ********* USE EFFECT -1- : Seperation of Responsibility ********* //
	// Whenever the cartItems array changes, we want to update
	// the cartCount
	useEffect(() => {
		const newCartCount = cartItems.reduce((cartCount, cartItem) => {
			return cartCount + cartItem.quantity;
		}, 0);
		setCartCount(newCartCount);
	}, [cartItems]);
	// ********* USE EFFECT -1- ********* //

	// ********* USE EFFECT -2- : Seperation of Responsibility  ********* //
	// Whenever the cartItems array changes, we want to update
	// the cartCount
	useEffect(() => {
		const newCartTotal = cartItems.reduce((cartTotal, cartItem) => {
			return cartTotal + cartItem.quantity * cartItem.price;
		}, 0);
		setCartTotal(newCartTotal);
	}, [cartItems]);
	// ********* USE EFFECT -2- ********* //

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const removeItemFromCart = (cartItemToRemove) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove));
	};

	const clearItemFromCart = (cartItemToClear) => {
		setCartItems(clearCartItem(cartItems, cartItemToClear));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartCount,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
