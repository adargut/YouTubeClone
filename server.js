// packages used
const express = require('express')
const testdb = require('./config/testdb')
const marker = require('@ajar/marker')

// app configuration
const PORT = 3030
const app = express()

// connect to mongodb
testdb.dbconnect()

// start the app
app.listen(PORT, () => {
    marker.i("Youtube server listening on port " + PORT)
});