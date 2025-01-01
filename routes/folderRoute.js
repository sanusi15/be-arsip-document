const express = require('express');
const { createFolderController, getParentFolderController, getFolderByParentPathController, getFolderBySlugController } = require('../controllers/folderController');

const router = express.Router()

router.post('/create', createFolderController)
router.get('/getParent', getParentFolderController)
router.get('/getSubById/:id', getFolderByParentPathController)
router.post('/getBySlug', getFolderBySlugController)

module.exports = router