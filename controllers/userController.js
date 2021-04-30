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
            user: newUser
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
        // console.log('req body', req.body);
        const foundUser = await user.findOne({
            where: {
                email: req.body.email
            }
        })
        console.log('foundUser', foundUser.dataValues);
        
        const encryptedId = jwt.sign({userId: foundUser.id}, process.env.JWT_SECRET)
        foundUser.id = encryptedId

        console.log('encryptedId', encryptedId);
        console.log('foundUser', foundUser);
        if (foundUser.password === req.body.password) {
            res.json({
                status: 200,
                message: 'User authenticated',
                user: foundUser
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
                user: {...foundUser, id: encryptedId}
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

module.exports = userController