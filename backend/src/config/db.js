import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // .env file se MONGOURI le raha hai
    await mongoose.connect(process.env.MONGOURI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Database connection failed!", error);
  }
};

export default connectDb;