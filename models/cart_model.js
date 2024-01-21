import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = Schema({
	title: {
		type: String,
		required: true
	},
	brand: {
		type: String,
	},
	thumbnail: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
}, {
	timestamps: true
});

export default mongoose.model('cart', cartSchema);