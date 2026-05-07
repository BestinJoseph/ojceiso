import { randomUUID } from "crypto";
import { diskStorage } from "multer";
import { extname } from "path";
import { PDFDocument } from "pdf-lib";

export const storage = diskStorage({
    destination: 'uploads',
    filename: async (req, file, cb) => {
        cb(null, generateFileName(file))
    }
})

const generateFileName = (file: any) => {
    return `${randomUUID().toString()}${extname(file.originalname)}`
}