import express from "express";

import { Register, Login } from "../../controllers/auth";
import { findUserByUsername, findUserByUsernameLogin } from "../../middlewares";


const AuthRouter = express.Router();

AuthRouter.post("/register", findUserByUsername, Register);
AuthRouter.post("/login", findUserByUsernameLogin, Login);


export default AuthRouter;

