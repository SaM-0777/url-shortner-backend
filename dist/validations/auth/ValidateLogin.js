"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// VALIDATION
const ValidationSchema = joi_1.default.object({
    username: joi_1.default.string().min(5).max(20).required(),
    /*email: Joi.string()
      .email()
      .min(5)
      .max(64)
      .required(),*/
    password: joi_1.default.string()
        /*.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))*/
        .min(8)
        .max(64)
        .required(),
});
exports.default = ValidationSchema;
