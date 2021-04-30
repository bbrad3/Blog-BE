const express = require('express')
const articleRouter = express.Router()

const articleController = require('../controllers/articleController')

articleRouter.get('/all', articleController.all)
articleRouter.get('/:articleId', articleController.one)
// articleRouter.get('/verify', articleController.verify)

module.exports = articleRouter