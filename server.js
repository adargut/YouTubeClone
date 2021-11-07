// packages used
const express = require('express')
const testdb = require('./config/testdb')
const marker = require('@ajar/marker')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')()

// .env variables
require('dotenv').config()

// app configuration
const PORT = 3030
const app = express()

// configure bodyParser
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json());

// let the app parse cookies
app.use(cookieParser)

// app routing
const apiRouter = require('./routers/api.js')
const mainRouter = require('./routers/main')
const authRouter = require('./routers/auth')
const accountRouter = require('./routers/account')
var engines = require('consolidate');

app.set('views', __dirname + '/public/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use('/api', apiRouter)
app.use('/', mainRouter);
app.use('/auth', authRouter)
app.use('/account', accountRouter);

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