const userModel = require('../models/userModel')

const getAllUserController = async (req, res) => {
    try {
        const users = await userModel.find({})
        if(!users){
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'List of User',
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get All User API',
            error
        })
    }
}

const getUserByIdController = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'User Found',
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Get User By ID API',
            error
        })
    }
}

module.exports = {getAllUserController, getUserByIdController}