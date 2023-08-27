import CategoryListItem from "../category-list-item/category-list-item.jsx";

import { CategoryListContainer } from "./category-list.styles.jsx";

const categories = [
	{
		id: 1,
		title: "hats",
		imageUrl:
			"https://raw.githubusercontent.com/njayem/FreshStreetWearCo./main/src/assets/Hats.png",
		route: "shop/hats",
	},
	{
		id: 2,
		title: "jackets",
		imageUrl:
			"https://raw.githubusercontent.com/njayem/FreshStreetWearCo./main/src/assets/Jackets.png",
		route: "shop/jackets",
	},
	{
		id: 3,
		title: "sneakers",
		imageUrl:
			"https://raw.githubusercontent.com/njayem/FreshStreetWearCo./main/src/assets/Sneakers.png",
		route: "shop/sneakers",
	},
	{
		id: 4,
		title: "womens",
		imageUrl:
			"https://raw.githubusercontent.com/njayem/FreshStreetWearCo./main/src/assets/Womens.png",
		route: "shop/womens",
	},
	{
		id: 5,
		title: "mens",
		imageUrl:
			"https://raw.githubusercontent.com/njayem/FreshStreetWearCo./main/src/assets/Mens.png",
		route: "shop/mens",
	},
];

const CategoryList = () => {
	return (
		<CategoryListContainer>
			{/* Inside our Categories Container */}
			{categories.map((category) => {
				// console.log(category);
				return <CategoryListItem key={category.id} category={category} />;
			})}
		</CategoryListContainer>
	);
};

export default CategoryList;
