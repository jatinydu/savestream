"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const auth_controllers_1 = require("./auth.controllers");
exports.Auth = {
    login: auth_controllers_1.login,
    signup: auth_controllers_1.signup,
};
