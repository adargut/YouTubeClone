const express = require('express')
const router = express.Router()
const path = require('path')
const axios = require('axios')
const marker = require('@ajar/marker')

// acount/
router.get('/', (req, res) => {
    const resolvedPath = path.resolve(`${__dirname}../../public/views/account.html`)
    console.log('cookies: ', req.cookies)
    axios.get('http://localhost:3030/api/me', {
        headers: {
            'Authorization': req.cookies.jwt
        }
    })
    .then((res) => {
        console.log(res)
    }).catch((err) => {
        marker.e(`Could not fetch user profile ${err}`)
    })
    .then(() => {
        res.sendFile(resolvedPath)
    })
})

module.exports = router;