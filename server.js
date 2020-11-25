// packages used
const express = require('express')
var marker = require('@ajar/marker')

// app configuration
const PORT = 3030
const app = express()

// start the app
app.listen(PORT, () => {
    marker.i("Youtube server listening on port " + PORT);
});