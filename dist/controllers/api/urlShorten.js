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
exports.getShortenUrlByUser = exports.getShortenUrlById = exports.updateShortenUrl = exports.deleteShortenUrl = exports.createShortenUrl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const shortid_1 = __importDefault(require("shortid"));
const models_1 = require("../../models");
function createShortenUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { redirectUrl, verifiedUser } = req.body;
        const { id } = verifiedUser;
        try {
            const newShortenUrl = new models_1.ShortenLink({
                user: new mongoose_1.default.Types.ObjectId(id),
                redirectUrl: redirectUrl
            });
            newShortenUrl.save();
            res.status(200).json({ newShortenUrl });
        }
        catch (error) {
            res.status(500).json({ CreateShortenURLError: error });
        }
    });
}
exports.createShortenUrl = createShortenUrl;
;
function deleteShortenUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { shortenUrlObjectId, verifiedUser } = req.body;
        const { id } = verifiedUser;
        let shortenUrl;
        try {
            shortenUrl = yield models_1.ShortenLink.findById({ _id: shortenUrlObjectId });
            if (!shortenUrl)
                return res.status(400).json({ error: "Invalid Request" });
            if (shortenUrl.user.toString() != new mongoose_1.default.Types.ObjectId(id).toString())
                return res.status(404).json({ DeleteShortenUrlObjectUnexpectedUserError: "Request denied" });
        }
        catch (error) {
            res.status(500).json({ DeleteShortenUrlFindExistingShortenUrlObjectError: "Requested object do not exist" });
        }
        try {
            yield (shortenUrl === null || shortenUrl === void 0 ? void 0 : shortenUrl.remove());
            res.status(200).json({ success: "Deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ ShortenUrlDeletionError: "Internal error" });
        }
    });
}
exports.deleteShortenUrl = deleteShortenUrl;
;
function updateShortenUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { shortenUrlObjectId, redirectUrl, verifiedUser } = req.body;
        const { id } = verifiedUser;
        try {
            const shortenUrl = yield models_1.ShortenLink.findById({ _id: shortenUrlObjectId });
            if (!shortenUrl)
                return res.status(400).json({ ObjectToUpdateNotFoundError: "Requested object not found" });
            if (shortenUrl.user.toString() !== new mongoose_1.default.Types.ObjectId(id).toString())
                return res.status(404).json({ UpdateShortenUrlObjectUnexpectedUserError: "Request denied" });
            shortenUrl.redirectUrl = redirectUrl || shortenUrl.redirectUrl;
            shortenUrl.code = shortid_1.default.generate();
            shortenUrl.updatedAt = new Date(Date.now());
            yield shortenUrl.save();
            res.status(200).json({ shortenUrl });
        }
        catch (error) {
            res.status(500).json({ UpdateShortenUrlFindExistingShortenUrlObjectError: "Requested object can not be updated right now." });
        }
    });
}
exports.updateShortenUrl = updateShortenUrl;
;
function getShortenUrlById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { shortenUrlObjectId, verifiedUser } = req.body;
        const { id } = verifiedUser;
        try {
            const shortenUrl = yield models_1.ShortenLink.findById({ _id: shortenUrlObjectId });
            if (!shortenUrl)
                return res.status(400).json({ ObjectToGetByIdNotFoundError: "Requested object not found" });
            if (shortenUrl.user.toString() !== new mongoose_1.default.Types.ObjectId(id).toString())
                return res.status(404).json({ GetByIdShortenUrlObjectUnexpectedUserError: "Request denied" });
            res.status(200).json({ shortenUrl });
        }
        catch (error) {
            res.status(500).json({ FindExistingShortenUrlObjectError: "Requested object can not be found right now." });
        }
    });
}
exports.getShortenUrlById = getShortenUrlById;
;
function getShortenUrlByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { verifiedUser } = req.body;
        const { id } = verifiedUser;
        const query = models_1.ShortenLink.aggregate([
            {
                "$match": { user: new mongoose_1.default.Types.ObjectId(id) }
            }
        ]);
        query.exec(function (err, response) {
            if (err)
                res.status(400).json({ GetShortenUrlByUserError: "Not found" });
            res.status(200).json({ response });
        });
    });
}
exports.getShortenUrlByUser = getShortenUrlByUser;
;
