const express = require('express');
const router = express.Router();
const controller = require('../../youtube/public/server/controller')
const token = require('../config/token')
const marker = require('@ajar/marker')

// api/
router.get('/', token.verifyJWT, (req, res) => {
    controller.welcome(req, res);
    res.sendFile(path.resolve(`${__dirname}../../public/views/index.html`))
})

// api/login
router.post('/login', (req, res) => {
    marker.i(`User with email ${req.body.email} attempted to login`)
    controller.authenticate(req, res);
})

// api/register
router.post('/register', (req, res) => {
    marker.i('Registering a new user')
    controller.registerUser(req, res);
})

// api/logout
router.get('/logout', (req, res) => {
    marker.i('Logging out...')
    controller.logout(req, res)
})

// api/me as get request
router.get('/me', token.verifyJWT, (req, res) => {
    controller.getLoggedInUserDetails(req, res);
})

// api/me as a put request
router.put('/me', token.verifyJWT, (req, res) => {
    controller.updateLoggedInUserDetails(req, res);
})

// export api router
module.exports = router;