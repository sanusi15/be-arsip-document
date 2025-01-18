const express = require('express')
const { createFileController, getFileByParentPathController, getFileByPathController, cutFileController } = require('../controllers/fileController')

const router = express.Router()

router.post('/create', createFileController)
router.get('/getByParentPath/:id', getFileByParentPathController)
router.post('/getByPath', getFileByPathController)
router.put('/cutFile/:id', cutFileController)


module.exports = router