const connect = require("../config/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  name: String,
  size: Number,
  type: String,
  path: String,
  pathId: String,
  createdAt: Date,
  createdBy: String,
  tags: [String],
  permissions: [
    {
      userId: String,
      accessType: [String]
    }
  ]
});

const insertFile = async function (data) {
  const db = await connect();
  return db.collection("files").insertOne(data);
};

const getFileByFolderId = async function (folderId = null) {
  const db = await connect();
  return db.collection("files").find({ pathId: folderId }).toArray();
};

const getFileByPath = async function (path = null) {
  const db = await connect();
  return db.collection("files").find({ path: path }).toArray();
};

module.exports = { insertFile, getFileByFolderId, getFileByPath };
