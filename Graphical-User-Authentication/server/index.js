import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5004;
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

app.listen(PORT, () => {
    console.log("*******************************************");
    console.log(`Server running on port  : ${PORT}`);
})
const connection = mongoose.connection;
connection.once("open", (error, result) => {
  if (error) {
    console.log("MONGO_DB connection unsuccessful..!");
    console.error(error); // Display the error details
  } else {
    console.log("MONGO_DB connection successful");
    console.log("*******************************************");
  }
});


import auth from './routes/authRoute.js'
app.use('/api',auth);

