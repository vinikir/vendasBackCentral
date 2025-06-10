import mongoose from "mongoose";

export const connectDatabase = async (uri: string) => {
    
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(uri);
    }
};