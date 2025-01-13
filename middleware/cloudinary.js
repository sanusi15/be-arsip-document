require("dotenv").config();
const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUD_API_KEY;
const api_secret = process.env.CLOUD_API_SECRET;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
});

const cloudinaryUpload = async (req, res) => {
    try {
        const filePath = "./uploads/" + req.fileName;
        const fileName = req.originalName;
        if (["jpg", "jpeg", "png", "gif"].includes(req.mimeType)) {
            const upload = await cloudinary.uploader.upload(filePath, {
            public_id: fileName,
            folder: "sistem_arsip/"
            });
            return upload
        } else {
            const upload = await cloudinary.uploader.upload(filePath, {
            public_id: fileName,
            folder: "sistem_arsip/",
            resource_type: "raw"
            });
            return upload
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {cloudinaryUpload}