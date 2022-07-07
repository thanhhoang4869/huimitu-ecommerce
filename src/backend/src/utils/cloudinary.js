import config from "#src/config/config";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from 'multer'

cloudinary.config(config.COULDINARY_CONFIG)

const createUploader = (path, allowedFormats) => {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: path,
            allowedFormats: allowedFormats,
        },
    });

    const uploader = multer({ 
        storage: storage 
    });
    return uploader
}

export {
    createUploader,
    cloudinary
}

