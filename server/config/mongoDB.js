import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDb connected");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/taskapp`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
