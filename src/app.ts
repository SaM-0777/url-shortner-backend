import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";

import AuthRouter from "./routes/auth";
import APIRouter from "./routes/api";


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
app.use("/auth", AuthRouter);
app.use("/api", APIRouter);
app.get("/", (req, res) => {
  res.status(404).send("<h1>404</h1>")
});

// DB config
mongoose.set('strictQuery', false)
mongoose.connect(`${MONGO_URI}`, function () {
  app.listen(PORT, function () {
    console.log("server is listening on port ", PORT)
  })
});
mongoose.connection.on("disconnected", () => console.log("MongoDB Disconnected"));

