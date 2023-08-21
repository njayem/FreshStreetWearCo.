import React from "react";
import Home from "./routes/home/home.component.jsx";
// Import the Routes and Route components
import { Routes, Route, Outlet } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component.jsx";

const Shop = () => {
	return (
		<div>
			<h1>I am the Shopping Page!</h1>
		</div>
	);
};

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
				<Route index element={<Home />}></Route>
				<Route path="shop" element={<Shop />}></Route>
			</Route>
		</Routes>
	);
};

export default App;
