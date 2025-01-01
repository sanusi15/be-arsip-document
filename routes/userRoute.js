const express = require('express');
const { getAllUserController, getUserByIdController } = require('../controllers/userController');

const router = express.Router()

router.get('/get/:id', getUserByIdController)
router.get('/getAll', getAllUserController)

module.exports = router

