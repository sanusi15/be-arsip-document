const fileModel = require('../models/fileModel')

const createFileController = async (req, res) => {
    try {
        const {title, size, fileExt, routePath, parentPath, tags, permissons} = req.body
        const newFile = await fileModel.create({title, size, fileExt, routePath, parentPath, tags, permissons})
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

module.exports = {createFileController, getFileByParentPathController, getFileByPathController}