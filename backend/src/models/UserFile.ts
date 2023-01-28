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
    file: any;
};

const userSchema = new Schema<User>({
    _id: {
        type: String,
        default: uuId,
    },
    file: {
        ref: 'files',
        type: String
    }
});

export const User = mongoose.model('user_files', userSchema);