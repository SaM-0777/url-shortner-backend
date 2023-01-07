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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "..", "..", ".env") });
const JWT_SECRET = process.env.JWT_SECRET;
function authorizeRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.header('auth-token');
        if (!token)
            return res.status(403).json({ RequestAuth: "Access Denied" });
        console.log(JWT_SECRET, typeof JWT_SECRET);
        // async
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (error, verified) => {
            if (error)
                return res.status(400).json({ TokenVerificationError: "Token could not be verified" });
            req.body.verifiedUser = verified;
            next();
        });
    });
}
exports.default = authorizeRequest;
;
