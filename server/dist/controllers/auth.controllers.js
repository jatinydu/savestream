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
exports.signup = exports.login = void 0;
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const models_1 = require("../models");
const utils_1 = require("../utils");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({
                success: false,
                message: "Username and password are required",
            });
        }
        const user = yield models_1.User.findOne({ username });
        if (!user) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ success: false, message: "User not found" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ success: false, message: "Invalid password" });
        }
        const payload = {
            id: user._id,
            username: user.username,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
        const token = (0, utils_1.generateAuthToken)(payload);
        res.status(http_status_codes_1.StatusCodes.OK).cookie("token", token, {
            httpOnly: true,
            secure: config_1.ENV.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        }).json({
            success: true,
            message: "Login successfull",
            user: {
                id: user._id,
                username: user.username,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
        });
    }
    catch (error) {
        console.error("🔴 Login error:", error.message);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: "Internal server error" });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({
                success: false,
                message: "Username and password are required",
            });
        }
        const userExist = yield models_1.User.findOne({ username });
        if (userExist) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE)
                .json({ success: false, message: "User already exists" });
        }
        if (username.length < 3 || username.length > 10) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({
                success: false,
                message: "Username must be between 3 and 20 characters long",
            });
        }
        if (password.length < 8 || password.length > 20) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Password must be between 8 and 20 characters long",
            });
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isPassStrong = passwordRegex.test(password);
        if (!isPassStrong) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({
                success: false,
                message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield models_1.User.create({
            username,
            password: hashedPassword,
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
        });
    }
    catch (error) {
        console.error("🔴 Signup error:", error.message);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: "Internal server error" });
    }
});
exports.signup = signup;
