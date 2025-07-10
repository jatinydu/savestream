"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const config_2 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use('/api/v1', routes_1.default);
(0, config_1.connectToDB)();
app.listen(config_2.ENV.PORT, () => {
    console.log("🟢 Server is running on port 4000");
});
