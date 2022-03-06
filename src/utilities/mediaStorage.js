import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

export const mediaStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: "HouseOfHope",
            allowedFormats: ["jpg", "png", "jpeg"],
        }
    }
})