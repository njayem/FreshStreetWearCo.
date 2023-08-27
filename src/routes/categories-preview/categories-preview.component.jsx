import { Fragment, useContext } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = ({ title, products }) => {
	const { categoriesMap } = useContext(CategoriesContext);

	return (
		/* categoriesMap is an object that is composed of arrays:
				 {
				   "hats": [{...}, {...}, {...}],
				   "jackets": [{...}, {...}, {...}],
				   "sneakers": [{...}, {...}, {...}],
				 }

				 In order to iterate over an object, we need to convert its
				 keys and store them into an array first
				 So that we can use the objectName[key] syntax to access
				 each key's array. ( note: key = property name = title)
				 like this:
				 [ "hats", "jackets", "sneakers"]

				 This creates an array of the keys in the categoriesMap
				 object and allows us to iterate over it */

		/* We can either use <Fragment> </Fragment> */
		/* Or we can use <> </>  as a shorthand*/
		<Fragment>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview key={title} title={title} products={products} />
				);
			})}
		</Fragment>
	);
};

export default CategoriesPreview;
