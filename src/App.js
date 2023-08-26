import React from "react";
import Home from "./routes/home/home.component.jsx";
// Import the Routes and Route components
import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component.jsx";
import Authentication from "./routes/authentication/authentication.component.jsx";

import Shop from "./routes/shop/shop.component.jsx";

import Checkout from "./routes/checkout/checkout.component.jsx";

const App = () => {
	return (
		// Routes allows us to register these route-level components
		// to render a specific component when it matches the URL path
		<Routes>
			{/* Navigation Bar is nested at the top level
			and has 2 child routes: Home and Shop */}
			<Route path="/" element={<Navigation />}>
				{/* writing index means that this is the default route
				 that will be rendered when the URL path matches
				 the parent route aka '/' */}
				<Route index element={<Home />} />
				<Route path="shop" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
