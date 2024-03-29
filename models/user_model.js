import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

export default mongoose.model('user', userSchema);