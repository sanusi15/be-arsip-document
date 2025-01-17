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
    const folders = await folderModel.find({parentPath}).sort({name: 1})
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
    const isExists = await folderModel.findOne({slugPath: convertToSlag}).sort({name: 1})
    if(!isExists){
      return res.status(404).send({
        success: false,
        message: 'Path Not Found'
      })
    }else{
      return res.status(200).send({
        success: true,
        data: isExists
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Get Folder By Path',
      error
    })
  }
}

const updateFolderNameController = async (req, res) => {
  try {
    const folderId = req.params.id
    const {newName, userAccess } = req.body
    const folder = await folderModel.findById(folderId)
    if(!folder){
      return res.status(404).send({
        success: false,
        message: 'Data Not Found'
      })
    }
    const oldRoutePath = folder.routePath
    const oldSlugPath = folder.slugPath
    const newRoutePath = oldRoutePath.replace(folder.name, newName)
    const newSlugPath = oldSlugPath.replace(folder.name.toLowerCase().replace(/\s+/g, "_"), newName.toLowerCase().replace(/\s+/g, "_"))
    await folderModel.findByIdAndUpdate(folderId, {
      name: newName,
      routePath: newRoutePath,
      slugPath: newSlugPath
    })
    const childFolders = await folderModel.find({routePath: {$regex: `^${oldRoutePath}`}});
    for(const child of childFolders){
      const updatedRoutePath = child.routePath.replace(oldRoutePath, newRoutePath)
      const updatedSlugPath = child.slugPath.replace(oldSlugPath, newSlugPath);
      await folderModel.findByIdAndUpdate(child._id, {
        routePath: updatedRoutePath,
        slugPath: updatedSlugPath,
      });
    }
    res.status(200).send({
      success: true,
      message: "Folder Name Updated"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: true,
      message: 'Error in Update Folder API',
      error
    })
  }
}

const cutFolderController = async (req, res) => {
  try {
    const folderId = req.params.id
    const {newParentFolderId} = req.body
    const folder = await folderModel.findById(folderId)
    if(!folder){
      return res.status(404).send({
        success: false,
        message: 'Folder Not Found',
      })
    }
    // get parent folder target
    const oldParentFolders = await folderModel.findById(folder.parentPath)
    if(!oldParentFolders){
      return res.status(404).send({
        success: false,
        message: 'Old Parent Folder Not Found'
      })
    }
    const oldParentFoldersRoutePath = oldParentFolders.routePath
    const oldParentFoldersSlugPath = oldParentFolders.slugPath

    if(folder.parentPath !== null){
      // get new parent folder target
      const newParentFolder = await folderModel.findById(newParentFolderId)
      if(!newParentFolder){
        return res.status(404).send({
          success: false,
          message: 'Folder Destination Not Found',
        })
      }
      const newParentFolderRoutePath = newParentFolder.routePath
      const newParentFolderSlugPath = newParentFolder.slugPath
      // update folder target
      await folderModel.findByIdAndUpdate(folderId, {
        parentPath: newParentFolderId,
        routePath: newParentFolderRoutePath + '/' + folder.name,
        slugPath: newParentFolderSlugPath + '/' + folder.name.toLowerCase().replace(/\s+/g, "_")
      })
      // get child folder target then update the routePath and slugPath
      const childFolders = await folderModel.find({routePath: {$regex: `${folder.routePath}`}})
      for(const child of childFolders){
        const updatedRoutePath = child.routePath.replace(oldParentFoldersRoutePath, newParentFolderRoutePath)
        const updatedSlugPath = child.slugPath.replace(oldParentFoldersSlugPath, newParentFolderSlugPath)
        await folderModel.findByIdAndUpdate(child._id, {
          routePath: updatedRoutePath,
          slugPath: updatedSlugPath
        })
      }
      res.status(200).send({
        success: true,
        message: "Cut Folder Success"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Cut Folder Controller',
      error
    })
  }
}

module.exports = { createFolderController, getParentFolderController, getFolderByParentPathController, getFolderBySlugController, updateFolderNameController, cutFolderController };
