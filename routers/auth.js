const express = require('express')
const path = require('path')
const router = express.Router()

// auth/signup
router.get('/signup', (req, res) => {
    res.sendFile(path.resolve(__dirname + '../../public/views/signup.html'))
})

// auth/login
router.get('/login', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}../../public/views/login.html`))
})

module.exports = router