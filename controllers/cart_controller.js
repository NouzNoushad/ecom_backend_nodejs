import cartSchema from "../models/cart_model.js";

export const createCart = async (req, res) => {
	try {
		const {title, brand, price, thumbnail } = req.body;
		if (!title || !brand || !price || !thumbnail) {
			res.status(500).json({status: 'failure', message: 'All fields are required' });
		} else {
			const cart = cartSchema({
				title,
				brand,
				price,
				thumbnail
			});
			const newCart = await cart.save();
			res.status(201).json({
				status: 'success',
				message: 'Cart created successfully', cart: {
					id: newCart._id,
					title: newCart.title,
					brand: newCart.brand,
					price: newCart.price,
					thumbnail: newCart.thumbnail,
			} });
		}
	} catch (error) {
		res.status(404).json({status: 'failure', message: 'Something went wrong' });
	}
}

export const getCarts = async (req, res) => {
	try {
		const carts = await cartSchema.find({});
		res.status(200).json({ status: 'success', carts });
	} catch (error) {
		res.status(404).json({status: 'failure', message: 'Something went wrong' });
	}
}

export const deleteCart = async (req, res) => {
	try {
		const { id } = req.params;
		const cart = await cartSchema.findByIdAndDelete(id);
		res.status(200).json({status: 'success', message: 'Successfully deleted the cart' });
	} catch (error) {
		res.status(404).json({status: 'failure', message: 'Something went wrong' });
	}
}