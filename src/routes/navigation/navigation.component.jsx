// A Fragment is a way to group a list of children without adding
// extra nodes to the DOM (we dont want a wraping div)
import { Fragment, useContext } from "react";

import { signOutUser } from "../../utils/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";

import { CartContext } from "../../contexts/cart.context";

import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import {
	NavigationContainer,
	NavLinks,
	NavLink,
	LogoContainer,
} from "./navigation.styles.jsx";

const Navigation = () => {
	// Hook into the context value "UserContext"
	// React will only re-run the code
	// This doesnt mean it will re-render the component
	// It will only re-render the component if our jsx values
	// change based on the context value
	const { currentUser } = useContext(UserContext);
	// console.log(currentUser);

	// const signOutHandler = async () => {
	// 	const res = await signOutUser();
	// console.log(res);
	// 	setCurrentUser(null);
	// };

	const { isCartOpen } = useContext(CartContext);

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<Logo className="logo" />
				</LogoContainer>

				<NavLinks>
					{/* Links behave like anchor tags */}
					<NavLink to="/shop">SHOP</NavLink>
					{/* WE USE THE TERNARY OPERATOR TO RENDER THE SIGN OUT LINK */}
					{/* If currentUser is true (aka not null) */}
					{currentUser ? (
						<NavLink as="span" onClick={signOutUser}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to="/auth">SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{/* If both are T, render the second value
				 i.e. <CartDropdown />	 */}
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			{/* Outlet allows us to render the nested route based on
			the URL path extension we use */}
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
