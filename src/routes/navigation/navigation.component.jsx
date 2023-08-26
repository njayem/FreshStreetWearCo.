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
import "./navigation.styles.scss";

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
			<div className="navigation">
				<Link className="logo-container" to="/">
					<Logo className="logo" />
				</Link>

				<div className="nav-links-container">
					{/* Links behave like anchor tags */}
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
					{/* WE USE THE TERNARY OPERATOR TO RENDER THE SIGN OUT LINK */}
					{/* If currentUser is true (aka not null) */}
					{currentUser ? (
						<span className="nav-link" onClick={signOutUser}>
							SIGN OUT
						</span>
					) : (
						<Link className="nav-link" to="/auth">
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</div>
				{/* If both are T, render the second value
				 i.e. <CartDropdown />	 */}
				{isCartOpen && <CartDropdown />}
			</div>
			{/* Outlet allows us to render the nested route based on
			the URL path extension we use */}
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
