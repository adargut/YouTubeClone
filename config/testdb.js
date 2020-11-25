// packages used
const mongoose = require('mongoose')
const secrets = require('./secrets')

// event emitter for database events
let db = mongoose.connection;

// connect to db
try {
    await mongoose.connect(secrets.db)
} catch (error) {
    marker.e("Error connecting to mongodb: " + error)
}

// exports
module.exports = {
    // connecting to mongodb
    dbconnect: () => {
        db.on('error', marker.e("MongoDB connection error, please check if MongoDB is running."))
        db.once('open', () => {
            marker.i("Youtube dp opened.")
        })
    }
}