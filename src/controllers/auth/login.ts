import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models";


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
        const token = jwt.sign({ _id: existingUser._id }, `${JWT_SECRET}`)
        res.header('auth-token', token)
        res.status(200).json({ message: "Login Successfully" })
      }
    }
    else res.status(400).json({ UserLoginError: "Username not found!" })
    return
  } catch (error) {
    res.status(500).json({ UserLoginInternalError: error })
  }
};

