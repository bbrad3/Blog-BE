const commentRouter = require("../routers/commentRouter")
const models = require('../models')
const { user, article, comment } = models
const jwt = require('jsonwebtoken')

const commentController = {}

commentController.new = async (req, res) => {
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        
        const newComment = await comment.create({
            content: req.body.content,
            articleId: req.body.articleId,
            userId: decryptedId.userId
        })
        const foundComment = await comment.findOne({
            where: {
                id: newComment.id
            },
            include: [
                {model: user}
            ]
        })
        console.log('newComment', newComment);
        res.json({
            status: 200,
            message: 'Comment created',
            comment: foundComment,
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not create comment',
            error
        })
    }
}

module.exports = commentController