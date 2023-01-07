"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../../models");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "..", "..", ".env") });
const JWT_SECRET = process.env.JWT_SECRET;
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const existingUser = yield models_1.User.findOne({ username: username });
            if (existingUser) {
                const validPassword = yield bcrypt_1.default.compare(password, existingUser.password);
                if (!validPassword)
                    res.status(400).json({ LoginError: "Invalid password" });
                else {
                    // create token
                    const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, JWT_SECRET);
                    res.header('auth-token', token);
                    res.status(200).json({ message: "Login Successfully" });
                }
            }
            else
                res.status(400).json({ UserLoginError: "Username not found!" });
        }
        catch (error) {
            res.status(500).json({ UserLoginInternalError: error });
        }
    });
}
exports.default = Login;
;
