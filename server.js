// packages used
const express = require('express')
const testdb = require('./config/testdb')
const marker = require('@ajar/marker')
var bodyParser = require('body-parser')

// .env variables
require('dotenv').config()

// app configuration
const PORT = 3030
const app = express()

// configure bodyParser
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json());


// app routing
const apiRouter = require('./routers/api.js')
const mainRouter = require('./routers/main')
const authRouter = require('./routers/auth')
app.use('/api', apiRouter)
app.use('/', mainRouter);
app.use('/auth', authRouter)

// 404 error
app.get('*', (req, res) => {
    res.redirect('/page-not-found')
})

// connect to mongodb
testdb.dbconnect()

// start the app
app.listen(PORT, () => {
    marker.i("Youtube server listening on port " + PORT)
});