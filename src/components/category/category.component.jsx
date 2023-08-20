import "./category.scss";
const Category = ({ category }) => {
	const { title, imageUrl } = category;
	return (
		<div className="category-container">
			<div
				className="background-image"
				style={{
					backgroundImage: `url(${imageUrl})`,
					width: "100%",
					height: "100%",
					objectFit: "cover",
				}}
			/>
			<div className="category-body-container">
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</div>
	);
};

export default Category;
