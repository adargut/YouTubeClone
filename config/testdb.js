// packages used
const mongoose = require('mongoose')
const secrets = require('./secrets')
const marker = require('@ajar/marker')

// event emitter for database events
var db = mongoose.connection;

// connect to db
try {
    mongoose.connect(secrets.db)
} catch (error) {
    marker.e("Error connecting to mongodb: " + error)
}

// exports
module.exports = { 
    // connecting to mongodb
    dbconnect: () => {
        db.on('error', () => {marker.e("MongoDB connection error, please check if MongoDB is running."
        )})
        db.once('open', () => {
            marker.i("Youtube db opened")
        })
    }
}