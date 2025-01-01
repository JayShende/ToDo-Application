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
const express_1 = __importDefault(require("express"));
const userRoute_1 = require("./routes/userRoute");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
// Connecting to the Database
function ConnectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Connecting to the DataBase");
        try {
            yield mongoose_1.default.connect(process.env.DataBase_Url);
            console.log("Conneted to the DataBase");
        }
        catch (error) {
            console.log("Unable to Connect to the DataBase");
        }
    });
}
ConnectDB();
const app = (0, express_1.default)();
const portNo = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/todoApp", userRoute_1.userRouter);
console.log("Listening on Port " + portNo);
app.listen(portNo);
