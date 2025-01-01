"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.ObjectId;
// Creating Schemas
const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String }
}, { timestamps: true });
const contentSchema = new Schema({
    userId: { type: ObjectId, require: true },
    title: { type: String },
    content: { type: String },
    done: { type: Boolean }
}, { timestamps: true });
const adminSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String }
});
const userModel = mongoose_1.default.model("users", userSchema);
exports.userModel = userModel;
const contentModel = mongoose_1.default.model("content", contentSchema);
exports.contentModel = contentModel;
const adminModel = mongoose_1.default.model("admin", adminSchema);
exports.adminModel = adminModel;
