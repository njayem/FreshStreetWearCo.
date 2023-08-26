import { createContext, useState, useEffect } from "react";

import {
	onAuthStateChangedListener,
	//signOutUser,
	createUserDocumentFromAuth,
} from "../utils/firebase.utils";

// ****** THE CONTEXT OBJECT ****** //
// EVERY CONTEXT HAS 2 PROPERTIES WHICH WE CAN LEVERAGE:
// { Provider: "...",
//   Consumer: "..." }
// (UserContext.Provider) AND (UserContext.Consumer)
// Initial value of the context object is null
// We leverage a state and an update function to update the value
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});
// ****** THE CONTEXT OBJECT ****** //

// ****** THE WRAPPER COMPONENT ****** //
// This is the component that will wrap around the components
// that need access to the value
// We wrap it around the components that need access to the value
// <UserProvider>
// <App/> --------> the child gets access to the "context" value
// </UserProvider>
export const UserProvider = ({ children }) => {
	// The value we want to share is a state
	// so we use the useState hook
	const [currentUser, setCurrentUser] = useState(null);
	// We create an object with 2 properties
	const value = { currentUser, setCurrentUser };

	// Sign out the user when the component mounts
	//signOutUser();

	// Run this function (ONCE) when the component mounts/unmounts
	useEffect(() => {
		// We need to tell onAuthStateChangedListener to stop
		// listening to the auth state when the component unmounts
		// onAuthStateChangedListener returns an UNSUBSCRIBE function
		// that we can call
		const unsubscribe = onAuthStateChangedListener((user) => {
			console.log("What onAuthStateChanged returned: ", user);

			if (user) {
				createUserDocumentFromAuth(user);
			}

			setCurrentUser(user);
		});

		// This is the cleanup function
		// that will run when the component unmounts
		// It knows what to clean up because we passed in the
		// unsubscribe function from the onAuthStateChangedListener
		// as an argument to the useEffect hook
		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
// ****** THE WRAPPER COMPONENT ****** //

// ****** THE CONSUMER COMPONENT ****** //

// ****** THE CONSUMER COMPONENT ****** //

// **************** RECAP **************** //
// 1. We create a context object
// 2. We create a wrapper component that will wrap around the
//    child components (We wrapped it around the App component)
// 3. We pass the value we want to share to the Provider component
// 4. We then import the following:
//    import { useContext } from "react"; and
//    import { UserContext } from "../../contexts/user.context";
//    into any component that needs access to the value
// 5. We then destructure what we need from the context object
// **************** RECAP **************** //
