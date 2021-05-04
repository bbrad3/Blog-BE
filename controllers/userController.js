const models = require('../models')
const { user, article, comment } = models
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

const userController = {}

userController.signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt)
        console.log('hashedPwd', hashedPassword);
        const [newUser, created] = await user.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                name: req.body.name,
                alias: req.body.alias,
                password: hashedPassword
            }
        })
        console.log('newUser', newUser, created);

        const encryptedId = jwt.sign({userId: newUser.id}, process.env.JWT_SECRET)

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
        // console.log('req body', req.body);
        const foundUser = await user.findOne({
            where: {
                email: req.body.email
            },
            include: article
        })
        // console.log('foundUser', foundUser.dataValues);
        
        // const match = await bcrypt.compareSync(req.body.password, foundUser.password)

        const encryptedId = await jwt.sign({userId: foundUser.id}, process.env.JWT_SECRET)

        // console.log('encryptedId', encryptedId);
        // console.log('foundUser', foundUser);
        if (req.body.password === foundUser.password) {
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

userController.top = async (req, res) => {
    try {
        const foundUsers = await user.findAll({
            attributes: ['alias'],
            include: [
                {model: article},
                {model: comment}
            ],
            order: [
                ['name', 'ASC'],
            ]
        })

        const sorted = foundUsers.sort((a, b) => {
            let scoreA = (a.articles.length * 10) + a.comments.length
            let scoreB = (b.articles.length * 10) + a.comments.length
            if (scoreA < scoreB) {
            return -1;
            }
            if (scoreA > scoreB) {
            return 1;
            }
        
            // articles.length must be equal
            return 0;
        })

        const topThree = sorted.splice(0, 3)

        res.json({
            status: 200,
            message: 'Sorted by name asc',
            users: topThree,
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Error in /users/top',
            error
        })
    }
}

userController.verify = async (req, res) => {
    try {
        let encryptedId = req.headers.authorization
        // console.log('encryptedId', encryptedId);
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        const foundUser = await user.findOne({
            where: {
                id: decryptedId.userId
            },
            include: [
                {model: article},
                {model: comment}
            ]
        })

        encryptedId = jwt.sign({userId: foundUser.id}, process.env.JWT_SECRET)
        // console.log(foundUser, encryptedId);
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

userController.authorize = async (req, res) => {
    try {
        const encryptedId = req.headers.authorization
        // console.log('encryptedId', encryptedId)
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        // console.log('decryptedId', decryptedId);

        let compare = null
        if (req.body.articleId) {
            const foundArticle = await article.findOne({
                where: {
                    id: req.body.articleId
                }
            })
            compare = foundArticle.userId
        } else if (req.body.commentId) {
            const foundComment = await comment.findOne({
                where: {
                    id: req.body.commentId
                }
            })
            compare = foundComment.userId
        }
        
        console.log('comparison', compare, decryptedId.userId);
        if (compare === decryptedId.userId) {
            res.json({
                status: 200,
                message: 'User authorized',
                isOwner: true
            })
        } else {
            res.json({
                status: 400,
                message: 'User not authorized',
                isOwner: false
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: 'Error in /user/authorize',
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
        // console.log('updatedUser', updatedUser);

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