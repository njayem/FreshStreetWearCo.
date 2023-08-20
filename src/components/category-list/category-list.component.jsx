import "./category-list.scss";
import Category from "../category/category.component.jsx";

const CategoryList = ({ categories }) => {
	<div className="categories-container">
		{/* Inside our Categories Container */}
		{categories.map((category) => {
			// console.log(category);
			return <Category key={category.id} category={category} />;
		})}
		;
	</div>;
};

export default CategoryList;
