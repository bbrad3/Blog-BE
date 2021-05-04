const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')

userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)
userRouter.get('/top', userController.top)
userRouter.get('/verify', userController.verify)
userRouter.post('/authorize', userController.authorize)
userRouter.put('/update', userController.update)
userRouter.delete('/delete', userController.delete)

module.exports = userRouter