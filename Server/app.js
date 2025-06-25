import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config("./.env");

import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from "./src/config/mongo.config.js";

import shortUrlRoute from "./src/routes/shortUrl.route.js"
import authRoute from "./src/routes/auth.route.js"
import userRoute from "./src/routes/user.route.js"
import { redirectFromShortUrl } from './src/controllers/shortUrl.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import { attachUser } from './src/utils/attachUser.js';

const port = process.env.PORT || 5000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(attachUser)
app.use("/api/user", userRoute)
app.use("/api/create", shortUrlRoute)
app.use("/api/auth", authRoute)
app.get('/:id', redirectFromShortUrl)


app.use(errorHandler)
app.listen(port, ()=>{
    connectDB();
    console.log(`Server is running on ${port}`);
})