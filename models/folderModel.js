const connect = require("../config/database");

const insertFolder = async function (data) {
  const db = await connect();
  return db.collection("folders").insertOne(data);
};

const getFolderByFolderId = async function (folderId = null) {
  const db = await connect();
  return db.collection("folders").find({ parentId: folderId }).toArray();
};

const getFolderByPath = async function (path = null) {
  const db = await connect();
  return db.collection("folders").find({ path: path }).toArray();
};

module.exports = {
  insertFolder,
  getFolderByFolderId,
  getFolderByPath
};
