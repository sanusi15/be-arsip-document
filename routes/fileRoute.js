const express = require('express')
const { createFileController, getFileByParentPathController, getFileByPathController } = require('../controllers/fileController')

const router = express.Router()

router.post('/create', createFileController)
router.get('/getByParentPath/:id', getFileByParentPathController)
router.post('/getByPath', getFileByPathController)


module.exports = router