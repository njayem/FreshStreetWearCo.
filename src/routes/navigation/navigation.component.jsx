// A Fragment is a way to group a list of children without adding
// extra nodes to the DOM (we dont want a wraping div)
import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = () => {
	return (
		<Fragment>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<CrownLogo className="logo" />
				</Link>

				<div className="nav-links-container">
					{/* Links behave like anchor tags */}
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
				</div>
			</div>
			{/* Outlet allows us to render the nested route based on
			the URL path extension we use */}
			<Outlet />
		</Fragment>
	);
};

export default Navigation;