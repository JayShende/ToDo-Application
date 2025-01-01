"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // console.log(decode);
        // @ts-ignore
        req.userId = decode.id;
        // console.log(decode);
        // @ts-ignore
        // console.log(req.userId)
        next();
    }
    catch (e) {
        res.sendStatus(403);
    }
};
exports.userMiddleware = userMiddleware;
