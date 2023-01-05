import express from "express";
import bcrypt from "bcrypt";
import { User } from "../../models";


export default async function Register(req: express.Request, res: express.Response) {
  const { username, password } = req.body
  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // save the user to db
  try {
    const newUser = new User({
      username: username,
      password: hashedPassword,
    })
    const savedUser = await newUser.save()
    res.status(200).json({ userId: savedUser.id })
  } catch (error) {
    res.status(500).json({ RegisterError: error })
  }
};

