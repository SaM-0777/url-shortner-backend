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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByUsernameLogin = void 0;
const auth_1 = require("../../validations/auth");
function findUserByUsernameLogin(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = auth_1.ValidateLogin.validate(req.body);
        if ((_a = error === null || error === void 0 ? void 0 : error.details[0]) === null || _a === void 0 ? void 0 : _a.message)
            return res.status(403).json({ ValidateLoginError: error.details[0].message });
        else
            next();
    });
}
exports.findUserByUsernameLogin = findUserByUsernameLogin;
;
