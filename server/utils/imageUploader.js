import { v2 as cloudinary} from "cloudinary";


const uploadImageToCloudinary = async (file,folder) => {

    const options = {
        folder:folder,
        resource_type:"auto",
    }

    return await cloudinary.uploader.upload(file.tempFilePath,options)

    
    
}

export default uploadImageToCloudinary;