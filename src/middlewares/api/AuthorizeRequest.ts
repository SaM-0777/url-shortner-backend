import express from "express";
import jwt from "jsonwebtoken";


const JWT_SECRET = "adwAS3D54119243t18n6fyt13i834z311R6TX36" as string;
const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I2YWZkMjUxNGU5MWE3OTcyYTZkOTIiLCJpYXQiOjE2NzI5MjkzMjh9.1AtAM5rjeuu6wMHoleZfrL5B9wTCPPvCkdP2R8cQrmo"

export default async function authorizeRequest(req:express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.header('auth-token') as string
  console.log(token)
  if(!token) res.status(403).json({ RequestAuth: "Access Denied" })
  
  jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I2YWZkMjUxNGU5MWE3OTcyYTZkOTIiLCJpYXQiOjE2NzI5MzkzMjV9.A_k-NiBGWcmlUlb1X8vkAoCg6Lf3_6W6ubVbeKfgfQU",
    "adwAS3D54119243t18n6fyt13i834z311R6TX36",
    (error, verified) => {
      console.log(error)
      if (error)
        return res
          .status(400)
          .json({ TokenVerificationError: "Token could not be verified" });
      next();
    }
  );
};

