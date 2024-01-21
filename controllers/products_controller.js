export const getProducts = async (req, res) => {
	try {
		const response = await fetch('https://dummyjson.com/products', {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const products = await response.json();
		res.status(200).json({ status: 'success', products: products["products"] });
	} catch (error) {
		res.status(404).json({ message: 'Unable to fetch data' });
	}
}