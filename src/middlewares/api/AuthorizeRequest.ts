import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.join(__dirname, "..", "..", "..", ".env") })


const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function authorizeRequest(req:express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.header('auth-token') as string
  if(!token) return res.status(403).json({ RequestAuth: "Access Denied" })
  console.log(JWT_SECRET, typeof JWT_SECRET)
  // async
  jwt.verify(token, JWT_SECRET, (error, verified) => {
    if (error) return res.status(400).json({ TokenVerificationError: "Token could not be verified" })
    req.body.verifiedUser = verified
    next()
  })
};

