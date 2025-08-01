import { UUID } from 'crypto';
import { Schema, model, Document } from 'mongoose';

interface IPost extends Document {
    title: string;
    type: string;
    desc?: string; // Optional description field
    link: string;
    tags: string[];
    is_deleted: boolean;
    share_id?: string; 
    user: Schema.Types.ObjectId; 
    created_at?: Date;
    updated_at?: Date;
}

const postSchema = new Schema<IPost>({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: false },
    type: { type: String, enum:["tweet","youtube","article"], required: true },
    is_deleted: { type: Boolean, default: false },
    link: { type: String, required: true },
    tags: [{
        type: Schema.Types.ObjectId, 
        ref: 'Tag',
        required: true
     }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    share_id: { type: String, unique: true, sparse: true } 
},{ timestamps: { createdAt:'created_at', updatedAt:'updated_at' } });

const Post = model<IPost>('Post', postSchema);
export default Post;