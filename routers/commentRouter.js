const express = require('express')
const commentRouter = express.Router()

const commentController = require('../controllers/commentController')

commentRouter.post('/new', commentController.new)
commentRouter.delete('/:commentId', commentController.delete)

module.exports = commentRouter