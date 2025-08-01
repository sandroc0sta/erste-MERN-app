import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.default.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
    }
}