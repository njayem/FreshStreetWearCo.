import React from "react";
import ReactDOM from "react-dom/client";

// Import the BrowserRouter component
// It has the ability to keep the UI in sync with the URL
import { BrowserRouter } from "react-router-dom";

import App from "./App.js";

// This is how we import (named) exports
// Named exports are exported by name (not by default)
// example: export const x = 5; // named export
// example: export default x; // default export
import { UserProvider } from "./contexts/user.context.jsx";

import { ProductsProvider } from "./contexts/products.context.jsx";

import { CartProvider } from "./contexts/cart.context.jsx";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<UserProvider>
				{/* App now has access to the "context" value */}
				{/* The child has access to the parent (never vice-versa) */}
				<ProductsProvider>
					<CartProvider>
						<App />
					</CartProvider>
				</ProductsProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
