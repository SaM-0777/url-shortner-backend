import express, { Router } from "express";

import { authorizeRequest } from "../../middlewares";

const APIRouter = express.Router();


APIRouter.get("/", authorizeRequest, async function (req: express.Request, res: express.Response) {
  const token = req.header("auth-token")
  res.status(200).json({ token: token, message: "Private Route" })
});


export default APIRouter;

