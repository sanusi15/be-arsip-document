const express = require('express');
const { getBySlugController } = require('../controllers/mainController');

const router = express.Router()

router.post('/getBySlug', getBySlugController)

module.exports = router

