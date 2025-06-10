import express from 'express';
const app = express();
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
dotenv.config("./.env");

import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/shortUrl.model.js";


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(5000, ()=>{
    connectDB();
    console.log("Server is running on port 5000");
})