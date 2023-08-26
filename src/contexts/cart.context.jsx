import { createContext, useState } from "react";

// Create the context
export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
});

// Create the provider
export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const value = { isCartOpen, setIsCartOpen };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
