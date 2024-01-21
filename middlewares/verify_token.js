import jwt from "jsonwebtoken";
import { savedTokens } from "../controllers/user_controller.js";

export const verifyToken = (req, res, next) => {
	if (req.headers.authorization !== undefined) {
		const token = req.headers.authorization.split(' ')[1];
		const decode = jwt.verify(token, process.env.SECRET_KEY);
		if (!savedTokens.has(token)) {
			req.userId = decode.id;
			req.name = decode.name;
			next();
		} else {
			res.status(404).json({ message: "You are not authorized" });
		}
	}
	else {
		res.status(404).json({ message: "Unauthorized token" });
	}
}