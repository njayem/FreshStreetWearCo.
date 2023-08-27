import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase.utils.js";

import SHOP_DATA from "../shop-data.js";

// Initialize our context
export const CategoriesContext = createContext({
	categoriesMap: {},
	setCategoriesMap: () => null,
});

// Set up our provider
export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	// *** WE ONLY CALLED THIS ONCE THEN COMMENTED IT OUT *** //
	// useEffect(() => {
	// 	addCollectionAndDocuments("categories", SHOP_DATA);
	// }, []);
	// *** WE ONLY CALLED THIS ONCE THEN COMMENTED IT OUT *** //

	// WHEN WE PASS AN ASYNC FUNCTION TO useEffect
	// (getCategoriesAndDocuments)
	// WE HAVE TO WRAP IT IN ANOTHER ASYNC FUNCTION
	// (getCategoriesMap)
	// LIKE THIS:
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			// console.log(categoryMap);
			setCategoriesMap(categoryMap);
		};
		getCategoriesMap();
	}, []);

	// We create an object with 1 property
	const value = { categoriesMap };

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
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
