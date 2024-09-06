import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/index.config";

export const mongodbConnection = async () => {
  try {
    await mongoose.connect(
      config.mongo.url,
      config.mongo.options as ConnectOptions
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
