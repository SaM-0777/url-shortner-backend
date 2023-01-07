"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const UserSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 128,
    },
    profileImage: {
        type: String,
        minlength: 10,
        maxlength: 4096,
    },
    organization: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 512,
    },
    profession: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 128,
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
exports.default = mongoose_1.default.model("UserProfile", UserSchema);
