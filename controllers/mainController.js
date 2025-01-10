const fs = require("fs");
const folderModel = require("../models/folderModel")
const fileModel = require('../models/fileModel');
const { cloudinaryUpload } = require("../middleware/cloudinary");

const getBySlugController = async (req, res) => {
    try {
        const {path} = req.body
        const convertToSlag = path.replaceAll(' ', '_').toLowerCase()
        const folder = await folderModel.findOne({slugPath: convertToSlag})
        if(!folder){
            return res.status(200).send({
            success: false,
            message: 'Path Not Found'
            })
        }
        const pathId = folder._id
        const getFolder = await folderModel.find({parentPath: pathId}).sort({name: 1})
        const getFile = await fileModel.find({parentPath: pathId}).sort({title: 1})
        res.status(200).send({
            success: true,
            message: 'Success Get Data By Slug',
            route: folder.routePath,
            folders: getFolder,
            files: getFile
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get Data By Slug',
            error
        })
    }
}

const uploadFileController = async (req, res) => {
    try {
        const files = req.files
        if(!files){
            return res.status(400).send({
                success: false,
                message: "Please Provide File"
            })
        }
        const { routePath, id } = req.body;
        if(!routePath || !id){
            return res.status(400).send({
                success: false,
                message: "Please Choose a Directory"
            })
        }
        const dataFile = await Promise.all(
            files.map( async (val) => {
                const splitNameExt = val.originalname.split(".");
                const data = {
                    title: splitNameExt[0],
                    size: val.size,
                    fileExt: splitNameExt[splitNameExt.length - 1],
                    parentPath: id,
                    routePath: routePath,
                    tags: ['file', 'index'],
                };
                const cloudUplod = await cloudinaryUpload({
                    fileName: val.filename,
                    originalName: val.originalname,
                    mimeType: splitNameExt[splitNameExt.length - 1],
                    routePath
                });
                try {
                    await fs.promises.unlink('./uploads/' + val.filename);
                    console.log(`File ${val.filename} berhasil dihapus.`);
                } catch (err) {
                    console.error(`Gagal menghapus file ${val.filename}:`, err.message);
                }
                return {
                    ...data,
                    dataCloud: {
                        asset_id: cloudUplod.asset_id,
                        public_id: cloudUplod.public_id,
                        url: cloudUplod.url,
                        secureUrl: cloudUplod.secure_url
                    }
                };
            })
        )
        const insert = await fileModel.insertMany(dataFile)
        if(insert){
            return res.status(200).send({
                success: true,
                message: "File uploaded successfully.",
            });
        }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Failed to upload file." });
    }
};

module.exports = {getBySlugController, uploadFileController}