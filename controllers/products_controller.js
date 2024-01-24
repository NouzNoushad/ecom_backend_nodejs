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
		res.status(404).json({status: 'failure', message: 'Unable to fetch data' });
	}
}

export const getProductById = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await fetch(`https://dummyjson.com/products/${id}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const product = await response.json();
		res.status(200).json({ status: 'success', product });
	} catch (error) {
		res.status(404).json({status: 'failure', message: 'Unable to fetch data' });
	}
}