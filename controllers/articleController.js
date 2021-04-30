const models = require('../models')
const { user, article } = models

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
            }
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

module.exports = articleController