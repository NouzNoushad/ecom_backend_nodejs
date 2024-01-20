import multer from "multer";
import path from "path";

export const uploadImage = (req, res, next) => {
	console.log('called');
	const storage = multer.diskStorage({
		destination: (req, file, cb) => cb(null, 'public/images'),
		filename: (req, file, cb) => {
			cb(null, `${Date.now()}-${Math.round(Math.random() * 1E8)}${path.extname(file.originalname)}`)
		}
	});
	const upload = multer({
		storage,
		limits: { fileSize: 1000000 * 5 },
	}).single('image');

	req.upload = upload;
	next();
}