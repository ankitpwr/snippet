import "dotenv/config";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //mongo db uri
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error("Server will continue running without database connection.");
  }
};
export default connectDB;
