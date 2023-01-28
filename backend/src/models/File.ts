import mongoose from "mongoose";
import { v4 } from 'uuid';

const uuId = v4()
const Schema = mongoose.Schema;

type File = mongoose.Document & {
    _id: string;
    name: string;
    size: string;
    link: string;
    createdAt: { type: Date, default: Date };
};

const userSchema = new Schema<File>({
    _id: {
        type: String,
        default: uuId,
    },
    name: {
        type: String,
    },
    size: {
        type: String,
    },
    link: {
        type: String,
    }
}, {
    timestamps: {
        createdAt: 'crAt'
    }
});

export const File = mongoose.model('files', userSchema);