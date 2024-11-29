const cloudinary = require("cloudinary").v2;
const { response } = require("express");
const fs = require("fs");
const { url } = require("inspector");
const path = require("path");
const { insertFile } = require("../models/fileModel");

cloudinary.config({
  cloud_name: "dtfy2c2eg",
  api_key: "365169621411617",
  api_secret: "SrezEt-qb9zcS_NUGk1qAqD6ta0"
});

const uploadPDF = async (req, res) => {
  console.log(req.file);
  const dataFile = {
    name: "Arsip Rahasia.docx",
    size: 1214,
    type: "docx",
    path: "/MINARTA/Arsip Minarta",
    pathId: "674581907d76ba1f9e749179",
    createdAt: {
      $date: "2024-11-20T11:00:00.000Z"
    },
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
