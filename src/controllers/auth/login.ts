import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../models";
import path from "path";


dotenv.config({ path: path.join(__dirname, "..", "..", "..", ".env") })


const JWT_SECRET = process.env.JWT_SECRET

export default async function Login(req: express.Request, res: express.Response) {
  const { username, password } = req.body
  try {
    const existingUser = await User.findOne({ username: username })
    if (existingUser) {
      const validPassword = await bcrypt.compare(password, existingUser.password)
      if (!validPassword) res.status(400).json({ LoginError: "Invalid password" })
      else {
        // create token
        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET as string)
        res.header('auth-token', token)
        res.status(200).json({ message: "Login Successfully" })
      }
    }
    else res.status(400).json({ UserLoginError: "Username not found!" })
  } catch (error) {
    res.status(500).json({ UserLoginInternalError: error })
  }
};

