const fileModel = require('../models/fileModel')
const folderModel = require('../models/folderModel')
const { cloudinaryCopy } = require('../services/cloudinary')

const createFileController = async (req, res) => {
    try {
        const {title, size, fileExt, parentPath, tags, permissons} = req.body
        const newFile = await fileModel.create({title, size, fileExt, parentPath, tags, permissons})
        if(!newFile){
            return res.status(500).send({
                success: false,
                message: 'Create file failed'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Create file success',
            newFile
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Create File API',
            error
        })
    }
}

const getFileByParentPathController = async (req, res) => {
    try {
        const parentPath = req.params.id
        if(!parentPath){
            return res.status(500).send({
                success: false,
                message: 'Please Provid Path ID',
            })
        }
        const files = await fileModel.find({parentPath})
        res.status(200).send({
            success: true,
            data: files
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get File By Path ID API',
            error
        })
    }
}

const getFileByPathController = async (req, res) => {
    try {
        const {path} = req.body
        if(!path){
            return res.status(500).send({
                success: false,
                message: 'Please Provide Path',
            })
        }
        const files = await fileModel.find({routePath: path.toLowerCase()})
        res.status(200).send({
            success: true,
            data: files
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get File By Path ID API',
            error
        })
    }
}

const cutFileController = async (req, res) => {
    try {
        const fileId = req.params.id
        const {newParentFolderId} = req.body
        const file = await fileModel.findById(fileId)
        if(!file){
            return res.status(404).send({
                success: false,
                message: 'File Not Found'
            })
        }
        const folder = await folderModel.findById(newParentFolderId)
        if(!folder){
            return res.status(404).send({
                success: false,
                message: 'Folder Not Found'
            })
        }
        await fileModel.findByIdAndUpdate(fileId, {
            parentPath: newParentFolderId
        })
        res.status(200).send({
            success: true,
            message: 'File Has Been Moved'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Cut File API',
            error
        })
    }
}

const copyFileController = async (req, res) => {
    try {
        const fileId = req.params.id
        const {newParentFolderId} = req.body
        const file = await fileModel.findById(fileId)
        if(!file){
            return res.status(404).send({
                success: false,
                message: 'File not found, please check again'
            })
        }
        const newParentFolder = await folderModel.findById(newParentFolderId)
        if(!newParentFolder){
            return res.status(404).send({
                success: false,
                message: 'Folder destination not found, please check again'
            })
        }
        // cek apakah nama file sudah ada di folder
        const fileName = file.title
        const countExistNameFile = await fileModel.find({
            title: fileName,
            parentPath: newParentFolderId
        })
        if(countExistNameFile.length >= 1){
            const codeName = ' - Copy'
            const groupName = fileName + codeName
            const countGroupName = await fileModel.find({
                title: {$regex: `^${groupName}`},
                parentPath: newParentFolderId
            })
            if(countGroupName.length >= 1){
                var newFileName = groupName + '('+(parseInt(countGroupName.length))+')'
            }else{
                var newFileName = groupName
            }
        }else{
            var newFileName = fileName
        }
        const dataFile = {
            title: newFileName,
            size: file.size,
            fileExt: file.fileExt,
            parentPath: newParentFolderId,
            tags: [
                "file",
                "index"
            ],
        }
        const sourcePublicId = file.dataCloud.url
        const targetPublicId = dataFile.title
        const cloudUplod = await cloudinaryCopy(sourcePublicId, targetPublicId)
        const newFile = {
            ...dataFile,
            dataCloud: {
                asset_id: cloudUplod.asset_id,
                public_id: cloudUplod.public_id,
                url: cloudUplod.url,
                secureUrl: cloudUplod.secure_url
            }
        }            
        await fileModel.create(newFile)
        res.status(200).send({
            success: true,
            newFile
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Copy File API'
        })
    }
}

module.exports = {createFileController, getFileByParentPathController, getFileByPathController, cutFileController, copyFileController}