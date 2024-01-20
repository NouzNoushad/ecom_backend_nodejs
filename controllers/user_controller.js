import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import userSchema from "../models/user_model.js";
import fileSchema from "../models/file_model.js";

export const registerUser = (req, res) => {
	try {
		req.upload(req, res, async (error) => {
			if (error) {
				res.status(404).json({message: 'upload error', error: error})
			}
			if (req.file) {
				// save image
				req.file.uuid = uuidv4();
				const image = await fileSchema.create(req.file);

				const { username, email, password } = req.body;
				if (!username || !email || !password) {
					res.status(500).json({ message: 'All fields are required' });
				} else {
					const user = await userSchema.findOne({ email: email });
					if (user) {
						res.status(404).json({ message: 'Email already taken' });
					} else {
						bcrypt.hash(password, 10).then(async (password) => {
							const userModel = userSchema({
									username,
									email,
									password,
									image: `http://localhost:3000/public/images/${image.filename}`,
							});
							const newUser = await userModel.save();
							res.status(201).json({
								message: 'Account created successfully', data: {
									name: newUser.username,
									email: newUser.email,
									password: newUser.password,
									image: newUser.image
								}
							});
						});
					}
				}
			}
		});
	} catch (error) {
		res.status(404).json({ message: 'Something went wrong', error: error });
	}
}

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(req.body);
		const user = await userSchema.findOne({ email: email });
		if (user) {
			bcrypt.compare(password, user.password).then((status) => {
				if (status) {
					jwt.sign({id: user._id, name: user.name}, process.env.SECRET_KEY, {
						expiresIn: 60 * 60 * 24 * 30
					}, (error, token) => {
						if (token) {
							res.status(200).json({ message: 'Successfully logged in', token: token });
						} else {
							res.status(404).json({message: 'Unable to load token'})
						}
					})
				} else {
					res.status(404).json({ message: 'Invalid password' });
				}
			});
		} else {
			res.status(404).json({ message: 'User not found' });
		}
		
	} catch (error) {
		res.status(404).json({ message: 'Something went wrong', error: error });
	}
}