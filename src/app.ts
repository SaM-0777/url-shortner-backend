import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";


dotenv.config({path: path.join(__dirname, '..', '.env')})

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const app = express()

// middleware
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.send("Hello World!")
});

// DB config
mongoose.set('strictQuery', false)
mongoose.connect(`${MONGO_URI}`, function () {
  app.listen(PORT, function () {
    console.log("server is listening on port ", PORT)
  })
});
mongoose.connection.on("disconnected", () => console.log("MongoDB Disconnected"));

