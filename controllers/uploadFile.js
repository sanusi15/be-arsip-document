require("dotenv").config();
const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUD_API_KEY;
const api_secret = process.env.CLOUD_API_SECRET;

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { insertFile } = require("../models/fileModel");

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
});

const dateTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const uploadPDF = async (req, res) => {
  const filename = req.file.originalname.split(".");
  const mimetype = filename[filename.length - 1];
  const { routePath, id } = req.body;
  const dataFile = {
    name: req.file.originalname,
    size: req.file.size,
    type: mimetype,
    path: routePath,
    pathId: id,
    createdAt: dateTime(),
    createdBy: "user123",
    tags: ["report", "finance"],
    permissions: [
      {
        userId: "user456",
        accessType: "read"
      },
      {
        userId: "user789",
        accessType: "write"
      }
    ]
  };

  console.log(dataFile)
  return false

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    const filePath = req.file.destination + "/" + req.file.filename;
    const fileName = req.file.originialname;
    if (["jpg", "jpeg", "png", "gif"].includes(mimetype)) {
      var uploadResult = await cloudinary.uploader.upload(filePath, {
        public_id: fileName,
        folder: "sistem_arsip/" + path
      });
    } else {
      var uploadResult = await cloudinary.uploader.upload(filePath, {
        public_id: fileName,
        folder: "sistem_arsip/" + path,
        resource_type: "raw"
      });
    }
    fs.unlinkSync(filePath);
    dataFile.secure_url = uploadResult.secure_url;
    await insertFile(dataFile);
    return res.status(200).json({
      message: "File uploaded successfully.",
      data: {
        url: uploadResult.url,
        public_id: uploadResult.public_id
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to upload file." });
  }
};

module.exports = { uploadPDF };
