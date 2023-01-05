import express from "express";
import { User } from "../../models";
import { ValidateLogin } from "../../validations/auth";


export async function findUserByUsernameLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { error } = ValidateLogin.validate(req.body)
  if (error?.details[0]?.message) return res.status(403).json({ ValidateLoginError: error.details[0].message })
  else next()
};

