const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

const userModel = require('../models/userModel')

const registerController = async (req, res) => {
    try {
        const {userName, password, position, level} = req.body
        if(!userName || !password){
            return res.status(500).send({
                success: false,
                message: 'Please Provide Username and Password'
            })
        }
        const existing = await userModel.findOne({userName})
        if(existing){
            return res.status(500).send({
                success: false,
                message: 'Username Already In Use'
            })
        }
        var salt = bcrypt.genSaltSync(10)
        var hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await userModel.create({userName, password: hashedPassword, position, level})
        newUser.password = undefined
        res.status(200).send({
            success: true,
            message: 'Create User Success',
            newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Create User API',
            error
        })
    }
}

const loginController = async (req, res) => {
    try {
        const {userName, password} = req.body
        if(!userName || !password){
            return res.status(500).send({
                success: false,
                message: 'Please Provide Username and Password'
            })
        }
        const user = await userModel.findOne({userName})
        if(!user){
            return res.status(500).send({
                success: false,
                message: 'User Not Found'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: 'Invalid Credential'
            })
        }
        const token = JWT.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        user.password = undefined
        res.status(200).send({
            success: true,
            message: 'Login Success',
            token,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            messsage: 'Error in Login API'
        })
    }
}

module.exports = {registerController, loginController}