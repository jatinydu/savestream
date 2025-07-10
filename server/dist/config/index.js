"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = exports.ENV = void 0;
const env_1 = require("./env");
Object.defineProperty(exports, "ENV", { enumerable: true, get: function () { return env_1.ENV; } });
const db_1 = __importDefault(require("./db"));
exports.connectToDB = db_1.default;
