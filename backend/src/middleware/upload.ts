import multer, {FileFilterCallback} from 'multer';
import moment from 'moment';
import { Request } from "express";

const storage = multer.diskStorage({
    destination(req: Request, file: any, cb){
        cb(null, 'uploads/')
    },
    filename(req: Request, file: any, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

export default multer({ storage, fileFilter, limits })