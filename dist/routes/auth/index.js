"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../controllers/auth");
const middlewares_1 = require("../../middlewares");
const AuthRouter = express_1.default.Router();
AuthRouter.post("/register", middlewares_1.findUserByUsername, auth_1.Register);
AuthRouter.post("/login", middlewares_1.findUserByUsernameLogin, auth_1.Login);
exports.default = AuthRouter;
