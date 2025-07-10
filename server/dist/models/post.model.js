"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    type: { type: String, enum: ["tweet", "youtube", "article"], required: true },
    is_deleted: { type: Boolean, default: false },
    link: { type: String, required: true },
    tags: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Tag'
        }],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const Post = (0, mongoose_1.model)('Post', postSchema);
exports.default = Post;
