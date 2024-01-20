import mongoose from "mongoose";

const { Schema } = mongoose;

const fileSchema = Schema({
	filename: {
		type: String,
		required: true
	},
	path: {
		type: String,
		required: true
	},
	size: {
		type: Number,
		required: true
	},
	uuid: {
		type: String,
		required: true
	}
});

export default mongoose.model('file', fileSchema);