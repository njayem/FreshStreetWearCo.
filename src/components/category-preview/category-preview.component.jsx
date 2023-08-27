import {
	CategoryPreviewContainer,
	Title,
	Preview,
} from "../category-preview/category-preview.styles.jsx";

import ProductCard from "../product-card/product-card.component.jsx";

import { Link } from "react-router-dom";

const CategoryPreview = ({ title, products }) => {
	return (
		<div>
			<CategoryPreviewContainer>
				<Title>
					{/* We only want the text clickable not the entire row */}
					<Link className="title" to={title}>
						{title.toUpperCase()}
					</Link>
				</Title>
				<Preview>
					{/* Ignore the first input element (the element itself)
        Becasue we want to get the first 4 products first
        THEN we map over them and include both input elements */}
					{products
						.filter((_, index) => index < 4)
						.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</Preview>
			</CategoryPreviewContainer>
		</div>
	);
};

export default CategoryPreview;
