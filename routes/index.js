const express = require("express");
const router = express.Router();
const { createFolder, getFolder } = require("../controllers/folderController");
const {
  getFileAndFolderByFolderId,
  getFileAndFolderByPath
} = require("../controllers/contentController");
const { uploadPDF } = require("../controllers/uploadFile");
const upload = require("../middleware/multer");

router.get("/folders", getFolder);
router.get("/getContentsByFolderId", getFileAndFolderByFolderId);
router.get("/getContentsByPath", getFileAndFolderByPath);
router.post("/upload", upload.single("file"), uploadPDF);

module.exports = router;
