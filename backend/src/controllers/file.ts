import {Request, Response} from "express";
import path from "path";
import { File } from "../models/File";
import {errorHandler} from "../utils/errorHandler";

export const file = {
    getAll: async function (req: Request, res: Response) {
        const fileId = req.params.fileId;
        const file: any = await File.find();

        if (!file) {
            return res.status(404).send({ success: false, message: 'File not found' });
        }

        const filePath = path.join(__dirname, `./uploads/${file.originalname}`);
        res.download(filePath, file.name);
    },
    create: async function (req: Request, res: Response) {
        const files: any = req.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileExists = await File.findOne({ name: file.originalname });

            if (fileExists) {
                res.status(201).json(fileExists);
            }

            let newFile = new File({
                name: file.originalname,
                size: file.size,
                link: file.path,
                createdAt: Date.now
            });

            await newFile.save();
            res.status(201).json(newFile);
        }
    },
    remove: async function (req: Request, res: Response) {
        const { id } = req.params;
        if (!id) { res.status(400).json({ message: 'id param is required' }) }

        try {
            await File.remove({_id: id});
            res.status(200).json({message: 'user has been deleted'});
        } catch (e: any) {
            errorHandler(res, e);
        }
    }
}