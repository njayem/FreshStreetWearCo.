import { createContext, useState, useEffect } from "react";

import PRODUCTS from "../shop-data.json";

// Initialize our context
export const ProductsContext = createContext({
	products: [],
	setProducts: () => null,
});

// Set up our provider
export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState(PRODUCTS);
	// We create an object with 1 property
	const value = { products };

	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	);
};

// **************** RECAP **************** //
// 1. We create a context object
// 2. We set up a provider component:
//    i) useState() hook to create a state
//    ii) value = { the properties we want from the context object }
//    iii) We return the Provider component with the value prop that
//         wraps around the children
// 3. We update the index.js file to wrap the compoennts that need
//    access to the context value with the Provider component
//    (inside out --> children have access to parent)
// 4. We go the desired component and import the context
// 5. We destructure the value we want using the useContext() hook
// **************** RECAP **************** //
