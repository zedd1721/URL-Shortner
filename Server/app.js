import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config("./.env");

import connectDB from "./src/config/mongo.config.js";

import shortUrlRoute from "./src/routes/shortUrl.route.js"
import { redirectFromShortUrl } from './src/controllers/shortUrl.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/create", shortUrlRoute)
app.get('/:id', redirectFromShortUrl)


app.use(errorHandler)
app.listen(5000, ()=>{
    connectDB();
    console.log("Server is running on port 5000");
})