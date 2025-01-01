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
exports.userRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dataBase_1 = require("../DB/dataBase");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware_1 = require("../Middleware/userMiddleware");
const mongoose_1 = require("mongoose");
// import dotenv from "dotenv";
// dotenv.config();
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const schema = zod_1.z.object({
        username: zod_1.z.string().min(5).max(10),
        email: zod_1.z.string().email(),
        password: zod_1.z
            .string()
            .min(8)
            .max(20)
            .refine(function (password) {
            return /[a-z]/.test(password);
        }, {
            message: "Password Must Contain atleast one Lowercase Letter",
        })
            .refine(function (password) {
            return /[A-Z]/.test(password);
        }, {
            message: "Password Must Contain At Least One Uppercase Letter",
        })
            .refine(function (password) {
            return /[0-9]/.test(password);
        }, {
            message: "Password Must Contain Atleast a Single Number",
        })
            .refine(function (password) {
            return /[\W_]/.test(password);
        }, {
            message: "Password Must Contain Atleast one Special Character",
        }),
    });
    //   Parsing the Schema Body using Zod Safe Parse
    const result = schema.safeParse(req.body);
    //   if res=success then sign in else the credentials dont follow the Constraints
    if (result.success) {
        // we will Signin
        const hashedPwd = yield bcrypt_1.default.hash(password, 5);
        // make an DB Entry with the Credentials
        try {
            yield dataBase_1.userModel.create({
                username: username,
                email: email,
                password: hashedPwd,
            });
            res.send({
                value: true,
                msg: "Signed in",
            });
            return;
        }
        catch (e) {
            res.send({
                value: false,
                message: "Username / Email Already Exists ",
            });
            return;
        }
    }
    else {
        res.send({
            value: false,
            message: result.error
        });
    }
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { input, password } = req.body;
    console.log("inside Login");
    // we will initally check weather the username/email provided exists in the data base or not
    const user = yield dataBase_1.userModel.findOne({
        $or: [{ username: input }, { email: input }],
    });
    console.log("h");
    if (user === null || user.password == null) {
        res.status(403).json({
            message: "Invalid Username/ Password Please Signup",
        });
        return;
    }
    else {
        const ans = yield bcrypt_1.default.compare(password, user.password);
        console.log(user);
        if (ans) {
            const token = jsonwebtoken_1.default.sign({
                id: user._id,
            }, process.env.JWT_SECRET);
            res.send({
                token: token,
            });
            return;
        }
        else {
            res.status(403).json({
                message: "Invalid Password",
            });
            return;
        }
    }
}));
userRouter.post("/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    // @ts-ignore
    const userId = req.userId;
    try {
        yield dataBase_1.contentModel.create({
            userId: userId,
            title: title,
            content: content,
            done: false
        });
        res.send({
            message: "Content Added Successfully",
        });
    }
    catch (err) {
        res.send({
            message: "Some Issue at the Content Model ",
        });
    }
}));
userRouter.get("/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const response = yield dataBase_1.contentModel.find({
        userId: userId,
    });
    res.send(response);
}));
userRouter.put("/update", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    var userId = req.userId;
    userId = new mongoose_1.Types.ObjectId(userId);
    const { oldPassword, newPassword } = req.body;
    console.log(typeof (userId));
    // verify the old password
    const response = yield dataBase_1.userModel.findOne({
        _id: userId
    });
    console.log(response);
    if (response === null || response.password == null) {
        res.status(403).json({
            message: "Invalid userId",
        });
        return;
    }
    else {
        const match = yield bcrypt_1.default.compare(oldPassword, response.password);
        // console.log(match);
        // console.log(oldPassword);
        // console.log(response.password);
        if (match) {
            const schema = zod_1.z.object({
                newPassword: zod_1.z
                    .string()
                    .min(8)
                    .max(20)
                    .refine(function (password) {
                    return /[a-z]/.test(password);
                }, {
                    message: "Password Must Contain atleast one Lowercase Letter",
                })
                    .refine(function (password) {
                    return /[A-Z]/.test(password);
                }, {
                    message: "Password Must Contain At Least One Uppercase Letter",
                })
                    .refine(function (password) {
                    return /[0-9]/.test(password);
                }, {
                    message: "Password Must Contain Atleast a Single Number",
                })
                    .refine(function (password) {
                    return /[\W_]/.test(password);
                }, {
                    message: "Password Must Contain Atleast one Special Character",
                }),
            });
            //   Parsing the Schema Body using Zod Safe Parse
            const result = schema.safeParse({ newPassword });
            if (result.success) {
                // we will Signin
                const hashedPwd = yield bcrypt_1.default.hash(newPassword, 5);
                console.log("Generated hash:", hashedPwd);
                yield dataBase_1.userModel.updateOne({ _id: userId }, { password: hashedPwd });
                console.log("Password updated in the database");
                // make an DB Entry with the Credentials
                try {
                    yield dataBase_1.userModel.updateOne({ _id: userId }, { password: hashedPwd });
                    res.send("SuccessFul");
                    return;
                }
                catch (e) {
                    res.send({
                        message: "Error in Updating PWD ",
                    });
                    return;
                }
            }
            else {
                res.send(result.error);
            }
        }
        else {
            res.send({
                message: "Invalid Old Password",
            });
        }
    }
}));
userRouter.delete("/remove", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteId = req.body.deleteId;
    // @ts-ignore
    const userId = req.userId;
    console.log(deleteId);
    const response = yield dataBase_1.contentModel.findOne({
        _id: deleteId,
    });
    console.log(response === null || response === void 0 ? void 0 : response.userId.toString());
    console.log(userId.toString());
    if (userId === (response === null || response === void 0 ? void 0 : response.userId.toString())) {
        const result = yield dataBase_1.contentModel.findByIdAndDelete(deleteId);
        if (result) {
            res.send({
                msg: "Deletion Successfull",
            });
        }
        else {
            res.send({
                msg: "Some Unknown Error on the delete endpoint okay",
            });
        }
    }
    else {
        res.sendStatus(403);
    }
}));
