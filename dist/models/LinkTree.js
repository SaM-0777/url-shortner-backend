"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
;
const TreeSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 256,
    },
    domain: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 64,
    },
    url: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 2048,
    }
});
const UserSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tree: {
        type: [TreeSchema],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("LinkTree", UserSchema);
