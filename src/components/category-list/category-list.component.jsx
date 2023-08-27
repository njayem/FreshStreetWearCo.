import CategoryListItem from "../category-list-item/category-list-item.jsx";

import { CategoryListContainer } from "./category-list.styles.jsx";

const CategoryList = ({ categories }) => {
	return (
		<CategoryListContainer>
			{/* Inside our Categories Container */}
			{categories.map((category) => {
				// console.log(category);
				return <CategoryListItem key={category.id} category={category} />;
			})}
			;
		</CategoryListContainer>
	);
};

export default CategoryList;
