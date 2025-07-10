"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
    posts: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Post'
        }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
