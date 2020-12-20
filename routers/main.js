const express = require('express');
const { dirname } = require('path');
const router = express.Router();
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}../../public/views/index.html`))
})

router.get('/page-not-found', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}../../public/views/404.html`))
})

module.exports = router;