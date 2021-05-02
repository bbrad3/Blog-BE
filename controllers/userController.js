const models = require('../models')
const { user, article } = models
const jwt = require('jsonwebtoken')

const userController = {}

userController.signup = async (req, res) => {
    try {
        const [newUser, created] = await user.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                name: req.body.name,
                alias: req.body.alias,
                password: req.body.password
            }
        })

        const encryptedId = jwt.sign({userId: newUser.id}, process.env.JWT_SECRET)

        // console.log('newUser', newUser, created);
        res.json({
            status: 200,
            message: 'User created',
            user: {...newUser.dataValues, id: encryptedId}
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Error in /users/signup',
            error
        })
    }
}

userController.login = async (req, res) => {
    try {
        console.log('req body', req.body);
        const foundUser = await user.findOne({
            where: {
                email: req.body.email
            },
            include: article
        })
        console.log('foundUser', foundUser.dataValues);
        
        const encryptedId = jwt.sign({userId: foundUser.id}, process.env.JWT_SECRET)

        console.log('encryptedId', encryptedId);
        console.log('foundUser', foundUser);
        if (foundUser.password === req.body.password) {
            res.json({
                status: 200,
                message: 'User authenticated',
                user: {...foundUser.dataValues, id: encryptedId}
            })
        } else {
            res.json({
                status: 401,
                message: 'Incorrect password'
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: 'Error in /user/login',
            error
        })
    }
}

userController.verify = async (req, res) => {
    try {
        let encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        const foundUser = await user.findOne({
            where: {
                id: decryptedId
            },
            include: article
        })

        encryptedId = jwt.sign({userId: foundUser.id}, process.env.JWT_SECRET)

        if (foundUser) {
            res.json({
                status: 200,
                message: 'Verified user',
                user: {...foundUser.dataValues, id: encryptedId}
            })
        } else {
            res.json({
                status: 404,
                message: 'No user logged in'
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: 'Error in /user/verify',
            error
        })
    }
}

userController.update = async (req, res) => {
    try {
        // let encryptedId = req.headers.authorization
        // const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        const foundUser = await user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        const updatedUser = await foundUser.update({
            name: req.body.name,
            alias: req.body.alias,
            email: req.body.email,
            password: req.body.password
        })
        console.log('updatedUser', updatedUser);

        const encryptedId = jwt.sign({userId: updatedUser.id}, process.env.JWT_SECRET)

        res.json({
            status: 200,
            message: 'User updated',
            user: updatedUser
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Error in /users/update',
            error
        })
    }
}

userController.delete = async (req, res) => {
    try {
        const foundUser = await user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        const deletedUser = await foundUser.destroy()
        res.json({
            status: 200,
            message: 'User deleted',
            user: deletedUser
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Error in /users/delete',
            error
        })
    }
}

module.exports = userController