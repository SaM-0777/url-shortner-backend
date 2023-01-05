import express from "express";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function authorizeRequest(req:express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.header('auth-token') as string
  console.log(token)
  if(!token) res.status(403).json({ RequestAuth: "Access Denied" })
  
  jwt.verify(token, JWT_SECRET, (error, verified) => {
    console.log(error)
    if (error) return res.status(400).json({ TokenVerificationError: "Token could not be verified" })
    next()
  })
};

