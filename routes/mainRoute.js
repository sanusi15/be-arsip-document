const express = require('express');
const upload = require("../middleware/multer");
const { getBySlugController, uploadFileController } = require('../controllers/mainController');

const router = express.Router()

router.post('/getBySlug', getBySlugController)
router.post('/upload', upload.array("files[]"), uploadFileController)

module.exports = router

