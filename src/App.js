import React from "react";
import "./categories.styles.scss";
import CategoryItem from "./components/category-item/category-item.component.jsx";

const App = () => {
	const categories = [
		{
			id: 1,
			title: "hats",
			imageUrl:
				"https://raw.githubusercontent.com/njayem/FreshStreetWearCo./main/public/assets/Hats.png",
		},
		{
			id: 2,
			title: "jackets",
			imageUrl:
				"https://raw.githubusercontent.com/njayem/FreshStreetWearCo./main/public/assets/Jackets.png",
		},
		{
			id: 3,
			title: "sneakers",
			imageUrl:
				"https://raw.githubusercontent.com/njayem/FreshStreetWearCo./main/public/assets/Sneakers.png",
		},
		{
			id: 4,
			title: "womens",
			imageUrl:
				"https://raw.githubusercontent.com/njayem/FreshStreetWearCo./main/public/assets/Womens.png",
		},
		{
			id: 5,
			title: "mens",
			imageUrl:
				"https://raw.githubusercontent.com/njayem/FreshStreetWearCo./main/public/assets/Mens.png",
		},
	];

	return (
		<div className="categories-container">
			{/* Inside our Categories Container */}
			{categories.map((category) => {
				// console.log(category);
				return <CategoryItem key={category.id} category={category} />;
			})}
			;
		</div>
	);
};

export default App;
