const folderModel = require("../models/folderModel")
const fileModel = require('../models/fileModel')

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
        const getFolder = await folderModel.find({parentPath: pathId})
        const getFile = await fileModel.find({parentPath: pathId})
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

module.exports = {getBySlugController}