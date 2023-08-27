import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			{/* WE WANT TO ACCESS A UNIQUE PARAMETER FOR EACH CATEGORY */}
			<Route path=":category" element={<Category />} />
		</Routes>
	);
};

export default Shop;
