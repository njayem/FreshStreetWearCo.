import CategoryList from "../../components/category-list/category-list.component";

// This allows us to render the nested routes
import { Outlet } from "react-router-dom";

const Home = () => {
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
	return <CategoryList categories={categories} />;
};

export default Home;