import { Schema, model } from 'mongoose';

interface ITag {
    name: string;
    posts?: Schema.Types.ObjectId[]; 
    created_at?: Date;
    updated_at?: Date;
}

const tagSchema = new Schema<ITag>({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }], 
}, {timestamps:{ createdAt:'created_at', updatedAt:'updated_at' }});

const Tag = model<ITag>('Tag', tagSchema);
export default Tag;
