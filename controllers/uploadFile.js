require("dotenv").config();
const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

const cloudinary = require("cloudinary").v2;
const { response } = require("express");
const fs = require("fs");
const { url } = require("inspector");
const path = require("path");
const { insertFile } = require("../models/fileModel");

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
});

const uploadPDF = async (req, res) => {
  const filename = req.file.originalname.split(".");
  const mimetype = filename[filename.length - 1];
  const { path, pathId } = req.body;
  const dataFile = {
    name: req.file.originalname,
    size: req.file.size,
    type: mimetype,
    path: path,
    pathId: pathId,
    createdAt: "2024-11-20T11:00:00.000Z",
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
  const insert = await insertFile(dataFile);
  console.log(insert);
  // try {
  //   if (!req.file) {
  //     return res.status(400).json({ error: "No file uploaded." });
  //   }
  //   const filePath = req.file.destination + "/" + req.file.filename;
  //   const fileName = req.file.originialname;
  //   const uploadResult = await cloudinary.uploader.upload(filePath, {
  //     public_id: fileName,
  //     folder: "sistem_arsip/minarta"
  //     // resource_type: "raw"
  //   });
  //   fs.unlinkSync(filePath);
  //   return res.status(200).json({
  //     message: "File uploaded successfully.",
  //     data: {
  //       url: uploadResult.url,
  //       public_id: uploadResult.public_id
  //     }
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({ error: "Failed to upload file." });
  // }
};

module.exports = { uploadPDF };
