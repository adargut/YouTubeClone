// packages used
const express = require('express')
const testdb = require('./config/testdb')
const marker = require('@ajar/marker')

// .env variables
require('dotenv').config()

// app configuration
const PORT = 3030
const app = express()

// app routing
const apiRouter = require('./routers/api.js')
const mainRouter = require('./routers/main')
app.use('/api', apiRouter)
app.use('/', mainRouter);

// connect to mongodb
testdb.dbconnect()

// start the app
app.listen(PORT, () => {
    marker.i("Youtube server listening on port " + PORT)
});