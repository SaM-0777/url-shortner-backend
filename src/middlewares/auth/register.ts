import express from "express";
import { User } from "../../models";
import { ValidateRegister } from "../../validations/auth";


export async function findUserByUsername(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { error } = ValidateRegister.validate(req.body)

  if (error?.details[0]?.message) return res.status(403).json({ ValidateRegisterError: error.details[0].message})

  const { username } = req.body
  try {
    const existingUser = await User.findOne({ username: username })
    if (existingUser) res.status(400).json({ UserExistsError: "Username already exists." })
    else next()
  } catch (error) {
    res.status(500).json({ UserExistInternalError: error })
  }
};

