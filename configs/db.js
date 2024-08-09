import mongoose from "mongoose";

const URI = `${process.env.DB_URI}/${process.env.DB_NAME}`;

async function connectToDB() {
    try {
        const conn = await mongoose.connect(URI);
        console.log(`MongoDB connected!`);
    } catch (error) {
        console.log(`MongoDB connection error, Error: ${error}`);
        process.exit(1);
    }
}

export default connectToDB; 