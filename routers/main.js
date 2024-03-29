const express = require('express');
const { dirname } = require('path');
const router = express.Router();
const path = require('path');
const { verifyJWT } = require('../config/token');

router.get('/', (req, res) => {
    const verifiedJWT = verifyJWTIndex(req, res)

    if (verifiedJWT) {
        res.sendFile(path.resolve(`${__dirname}../../public/views/index_logged_in.html`))
    }
    else {
        res.sendFile(path.resolve(`${__dirname}../../public/views/index.html`))
    }
})

router.get('/page-not-found', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}../../public/views/404.html`))
})

module.exports = router;