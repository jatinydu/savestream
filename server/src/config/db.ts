import mongoose from "mongoose";
import { ENV } from "./";

const connectToDB = async () => {
    try {
        await mongoose.connect(ENV.DB_URL);
        console.log("🟢 server connected to MongoDB successfully");
    } catch (error:any) {
        console.error("🔴 MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectToDB;