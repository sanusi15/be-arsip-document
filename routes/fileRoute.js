const express = require('express')
const { createFileController, getFileByParentPathController, getFileByPathController, cutFileController, copyFileController } = require('../controllers/fileController')

const router = express.Router()

router.post('/create', createFileController)
router.get('/getByParentPath/:id', getFileByParentPathController)
router.post('/getByPath', getFileByPathController)
router.put('/cutFile/:id', cutFileController)
router.put('/copyFile/:id', copyFileController)


module.exports = router