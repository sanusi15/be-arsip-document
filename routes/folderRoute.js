const express = require('express');
const { createFolderController, getParentFolderController, getFolderByParentPathController, getFolderBySlugController, updateFolderNameController, cutFolderController } = require('../controllers/folderController');

const router = express.Router()

router.post('/create', createFolderController)
router.get('/getParent', getParentFolderController)
router.get('/getSubById/:id', getFolderByParentPathController)
router.post('/getBySlug', getFolderBySlugController)
router.put('/updateName/:id', updateFolderNameController)
router.put('/cutFolder/:id', cutFolderController)

module.exports = router