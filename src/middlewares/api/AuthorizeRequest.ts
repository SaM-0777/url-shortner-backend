import express from "express";
import jwt from "jsonwebtoken";


export default async function authorizeRequest(req:express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.header('auth-token')  
  
  if(!token) res.status(403).json({ RequestAuth: "Access Denied" })
  
  try {
    jwt.verify(token!, process.env.JWT_SECRET!, (error, verifiedToken) => {
      console.log("Verifed: ", verifiedToken)
      next()
    })
  } catch (error) {
    res.status(400).json({ RequestVerificationError: "Invalid Token" })
  }
};

