const express = require('express')
const articleRouter = express.Router()

const articleController = require('../controllers/articleController')

articleRouter.get('/all', articleController.all)
articleRouter.get('/:articleId', articleController.one)
articleRouter.post('/new', articleController.new)
articleRouter.put('/:articleId', articleController.update)
articleRouter.delete('/:articleId', articleController.delete)

module.exports = articleRouter