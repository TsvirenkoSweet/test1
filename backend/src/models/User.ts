import mongoose from "mongoose";
import { v4 } from 'uuid';

const uuId = v4()
const Schema = mongoose.Schema;

type User = mongoose.Document & {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    userFile: any;
};

const userSchema = new Schema<User>({
    _id: {
        type: String,
        default: uuId,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum : ['user', 'admin'],
        default: 'user'
    },
    userFile: [
        {
            ref: 'user_file',
            type: String
        }
    ]
});

export const User = mongoose.model('users', userSchema);