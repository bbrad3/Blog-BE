const express = require('express')
const app = express()

const routesReport = require('rowdy-logger').begin(app)

// MIDDLEWARE
app.use(express.json())
app.use(require('morgan')('dev'))
app.use(require('cors')())
require('dotenv').config()

// ROUTES
const userRouter = require('./routers/userRouter')
app.use('/users', userRouter)

const articleRouter = require('./routers/articleRouter')
app.use('/articles', articleRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    routesReport.print()
})