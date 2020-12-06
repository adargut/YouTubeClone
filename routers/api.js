const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')

// api/
router.get('/', (req, res) => {
    controller.welcome(req, res);
})

// api/login
router.post('/login', (req, res) => {
    controller.authenticate(req, res);
})

// api/register
router.post('/register', (req, res) => {
    controller.registerUser(req, res);
})

// api/me as get request
router.get('/me', (req, res) => {
    controller.getLoggedInUserDetails(req, res);
})

// api/me as a put request
router.put('/me', (req, res) => {
    controller.updateLoggedInUserDetails(req, res);
})

// export api router
module.exports = router;