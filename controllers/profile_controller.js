import userSchema from "../models/user_model.js";

export const getProfile = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await userSchema.findOne({ email: email });
		if (user) {
			res.status(200).json({
				status: 'success', data: {
					username: user.username,
					email: user.email,
					image: user.image,
				}
			});
		} else {
			res.status(404).json({status: 'failure', message: 'User not found' });
		}
	} catch (error) {
		res.status(404).json({status: 'failure', message: 'Something went wrong' });
	}
}

export const updateProfile = async (req, res) => {
	try {
		const { id } = req.params;
		const { username, email } = req.body;
		const userExists = await userSchema.findOne({ email: email });
		if (userExists) {
			res.status(404).json({status: 'failure', message: 'Email already taken' });
		} else {
			await userSchema.updateOne({ _id: id }, req.body);
			const user = await userSchema.findById(id);
			res.status(200).json({
				status: 'success', data: {
					username: user.username,
					email: user.email,
					image: user.image,
				}
			});
		}
		
	} catch (error) {
		res.status(404).json({status: 'failure', message: 'Something went wrong' });
	}
}