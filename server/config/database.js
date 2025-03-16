import mongoose from "mongoose";
import "dotenv/config.js";

const dbConnection = async() => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database is connected Successfully");
    })
    .catch((error) => {
      console.log("Error occur to connect DB ", error);
      process.exit(1);
    })
};



export default dbConnection;