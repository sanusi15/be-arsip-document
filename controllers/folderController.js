const folderModel = require("../models/folderModel");

const createFolderController = async (req, res) => {
  try {
    const {name, parentPath, routePath, slugPath, userAccess} = req.body
    if(!name || !routePath){
      return res.status(500).send({
        success: false,
        message: 'Please provide name and route path folder',
      })
    }
    const newFolder = await folderModel.create({name, parentPath, routePath, slugPath, userAccess})
    if(!newFolder){
      return res.status(500).send({
        success: false,
        message: 'Create folder failed',
      })
    }
    res.status(200).send({
      success: true,
      message: 'Create folder success',
      newFolder
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Create Folder API',
      error
    })
  }
}

const getParentFolderController = async (req, res) => {
  try {
    const folders = await folderModel.find({parentPath: null})
    if(!folders){
      return res.status(404).send({
        success: false,
        message: 'Parent Folder Not Found'
      })
    }
    res.status(200).send({
      success: true,
      message: 'Get Parent Folder Success',
      data: folders
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Get Parent Folder API',
      error
    })
  }
}

const getFolderByParentPathController = async (req, res) => {
  try {
    const parentPath = req.params.id
    if(!parentPath){
      return res.status(500).send({
        success: false,
        message: 'Please Provide Parent Path ID'
      })
    }
    const folders = await folderModel.find({parentPath})
    if(!folders){
      return res.status(404).send({
        success: false,
        message: 'Folder Not Found'
      })
    }
    res.status(200).send({
      success: true,
      message: 'Get Sub Folder Success',
      data: folders
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Get Sub Folder API',
      error
    })
  }
}

const getFolderBySlugController = async (req, res) => {
  try {
    const {path} = req.body
    const convertToSlag = path.replaceAll(' ', '_').toLowerCase()
    const isExists = await folderModel.findOne({slugPath: convertToSlag})
    if(!isExists){
      return res.status(404).send({
        success: false,
        message: 'Path Not Found'
      })
    }else{
      return res.status(200).send({
        data: isExists
      })
    }
    // if(!path){
    //   return res.status(500).send({
    //     success: false,
    //     message: 'Please Provide Path Folder'
    //   })
    // }
    // const folders = await folderModel.find({routePath: path.toLowerCase()})
    // res.status(200).send({
    //   success: true,
    //   data: folders
    // })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Get Folder By Path',
      error
    })
  }
}

module.exports = { createFolderController, getParentFolderController, getFolderByParentPathController, getFolderBySlugController };
