"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../../controllers/api");
const middlewares_1 = require("../../middlewares");
const APIRouter = express_1.default.Router();
APIRouter.post("/url-shorten/create", middlewares_1.authorizeRequest, api_1.createShortenUrl);
APIRouter.delete("/url-shorten/delete", middlewares_1.authorizeRequest, api_1.deleteShortenUrl);
APIRouter.put("/url-shorten/update", middlewares_1.authorizeRequest, api_1.updateShortenUrl);
APIRouter.get("/url-shorten/get-by-id", middlewares_1.authorizeRequest, api_1.getShortenUrlById);
APIRouter.get("/url-shorten/get-by-user", middlewares_1.authorizeRequest, api_1.getShortenUrlByUser);
exports.default = APIRouter;
