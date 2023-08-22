import React from "react";
import ReactDOM from "react-dom/client";

// Import the BrowserRouter component
// It has the ability to keep the UI in sync with the URL
import { BrowserRouter } from "react-router-dom";

import App from "./App.js";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
