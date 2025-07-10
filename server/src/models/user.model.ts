import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    is_deleted: boolean;
    posts: Schema.Types.ObjectId[]; 
    created_at?: Date;
    updated_at?: Date;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
},{ timestamps: { createdAt:'created_at', updatedAt:'updated_at' } });

const User = model<IUser>('User', userSchema);
export default User;