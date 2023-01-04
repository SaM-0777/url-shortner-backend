import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";


dotenv.config({path: path.join(__dirname, '..', '.env')})

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const app = express()

app.get("/", (req, res) => {
  res.send("Hello World!")
});

// DB config
mongoose.connect(`${MONGO_URI}`, function () {
  app.listen(PORT, function () {
    console.log("server is listening on port ", PORT)
  })
});
mongoose.connection.on("disconnected", () => console.log("MongoDB Disconnected"));

