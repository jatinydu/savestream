"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const PORT = Number(process.env.PORT);
const DB_URL = process.env.DB_URL;
const JWT_SECRET = process.env.JWT_SECRET;
exports.ENV = {
    PORT,
    DB_URL,
    JWT_SECRET
};
