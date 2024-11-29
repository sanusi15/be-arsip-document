const folderModel = require("../models/folderModel");
const fileModel = require("../models/fileModel");
const getFileAndFolderByFolderId = async (req, res) => {
  try {
    const folderId = req.query.folderId;
    const dataFolder = await folderModel.getFolderByFolderId(folderId);
    const dataFile = await fileModel.getFileByFolderId(folderId);
    const result = {
      status: 200,
      data: {
        folder: dataFolder,
        file: dataFile
      }
    };
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getFileAndFolderByPath = async (req, res) => {
  try {
    const path = req.query.path;
    const dataFolder = await folderModel.getFolderByPath(path);
    const dataFile = await fileModel.getFileByPath(path);
    const result = {
      status: 200,
      data: {
        folder: dataFolder,
        file: dataFile
      }
    };
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getFileAndFolderByFolderId, getFileAndFolderByPath };
