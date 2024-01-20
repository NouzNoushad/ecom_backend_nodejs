import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user_route.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config({ path: './conn.env' });

mongoose.connect(process.env.CONN_STR);

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database connected'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/', userRoute);

app.listen(process.env.PORT, () => console.log(`Server started on PORT: ${process.env.PORT}`));