import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
const dbConnect = async () => {
  try {
    await mongoose.connect(`${MONGODB_URI}EdTech`);
    console.log("Connected:" + mongoose.connection.host);
  } catch (error) {
    console.log("Error Connecting to Mongo DB!");
    console.log(error);
  }
};

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
