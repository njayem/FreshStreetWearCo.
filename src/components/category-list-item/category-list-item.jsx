import {
	CLIContainer,
	BackgroundImage,
	Body,
} from "./category-list-item.styles.jsx";

const CategoryListItem = ({ category }) => {
	const { title, imageUrl } = category;

	return (
		<CLIContainer>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</CLIContainer>
	);
};

export default CategoryListItem;
