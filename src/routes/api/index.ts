import express, { Router } from "express";

import { createShortenUrl, deleteShortenUrl, updateShortenUrl, getShortenUrlById, getShortenUrlByUser } from "../../controllers/api";
import { authorizeRequest } from "../../middlewares";

const APIRouter = express.Router();


APIRouter.post("/url-shorten/create", createShortenUrl);
APIRouter.delete("/url-shorten/delete", deleteShortenUrl);
APIRouter.put("/url-shorten/update", updateShortenUrl);
APIRouter.get("/url-shorten/get-by-id", getShortenUrlById);
APIRouter.get("/url-shorten/get-by-user", getShortenUrlByUser);


export default APIRouter;

