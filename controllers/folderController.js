const folderModel = require("../models/folderModel");

const getFolder = async (req, res) => {
  try {
    const data = await folderModel.getFolderByFolderId(req.query.folderId);
    const result = {
      status: 200,
      data: data
    };
    res.json(result);
  } catch (error) {}
};

const createFolder = async (req, res) => {
  try {
    const data = req.body;
    const result = await folderModel.insertFolder(data);
    console.log("success");
  } catch (error) {
    console.log("failed");
  }
};

module.exports = { createFolder, getFolder };
