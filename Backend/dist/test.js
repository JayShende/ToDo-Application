"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
var str = '2011-04-11T10:20:30Z';
var date = (0, moment_1.default)(str);
var dateComponent = date.utc().format('YYYY-MM-DD');
var timeComponent = date.utc().format('HH:mm:ss');
console.log(dateComponent);
console.log(timeComponent);
