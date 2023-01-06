import express, { Router } from "express";

import { createShortenUrl, deleteShortenUrl, updateShortenUrl, getShortenUrlById, getShortenUrlByUser } from "../../controllers/api";
import { authorizeRequest } from "../../middlewares";

const APIRouter = express.Router();


APIRouter.post("/url-shorten/create", authorizeRequest, createShortenUrl);
APIRouter.delete("/url-shorten/delete", authorizeRequest, deleteShortenUrl);
APIRouter.put("/url-shorten/update", authorizeRequest, updateShortenUrl);
APIRouter.get("/url-shorten/get-by-id", authorizeRequest, getShortenUrlById);
APIRouter.get("/url-shorten/get-by-user", authorizeRequest, getShortenUrlByUser);


export default APIRouter;

