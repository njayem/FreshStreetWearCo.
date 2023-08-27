import { useNavigate } from "react-router-dom";

import {
	CLIContainer,
	BackgroundImage,
	Body,
} from "./category-list-item.styles.jsx";

const CategoryListItem = ({ category }) => {
	const { title, imageUrl, route } = category;

	const navigate = useNavigate();

	const onNavigateHandler = () => {
		navigate(route);
	};

	return (
		<CLIContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</CLIContainer>
	);
};

export default CategoryListItem;
