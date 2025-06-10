import mongoose, { mongo } from "mongoose";
const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to DB: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
        
    }
}

export default connectDB;