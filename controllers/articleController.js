const models = require('../models')
const { user, article, comment } = models
const jwt = require('jsonwebtoken')

const articleController = {}

articleController.all = async (req, res) => {
    try {
        const allArticles = await article.findAll()
        res.json({
            status: 200,
            message: 'Here are all articles',
            articles: allArticles
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not get all articles',
            error
        })
    }
}

articleController.one = async (req, res) => {
    try {
        const oneArticle = await article.findOne({
            where: {
                id: req.params.articleId
            },
            include: comment
        })
        res.json({
            status: 200,
            message: 'Here is one article',
            article: oneArticle
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not get all articles',
            error
        })
    }
}

articleController.new = async (req, res) => {
    try {
        console.log('headers', req.headers);
        const encryptedId = req.headers.authorization
        console.log('encryptedId', encryptedId);
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        const newArticle = await article.create({
            title: req.body.title,
            content: req.body.content,
            rank: 0,
            userId: decryptedId.userId,
        })
        res.json({
            status: 200,
            message: 'Article created',
            article: {...newArticle, userId: encryptedId}
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not create article',
            error
        })
    }
}

articleController.update = async (req, res) => {
    try {
        const foundArticle = await article.findOne({
            where: {
                id: req.params.articleId
            }
        })
        const updatedArticle = await foundArticle.update({
            title: req.body.title,
            content: req.body.content
        })
        res.json({
            status: 200,
            message: 'article updated',
            article: updatedArticle
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not update article',
            error
        })
    }
}

articleController.delete = async (req, res) => {
    try {
        const foundArticle = await article.findOne({
            where: {
                id: req.params.articleId
            }
        })
        const deletedArticle = await foundArticle.destroy()
        res.json({
            status: 200,
            message: 'Article deleted',
            article: deletedArticle
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not delete article',
            error
        })
    }
}

module.exports = articleController