const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongooseConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}EdTech`);
    console.log("Connected:" + mongoose.connection.host);
  } catch (error) {
    console.log("Error Connecting to Mongo DB!");
    console.log(error);
  }
};

module.exports = mongooseConnect;
