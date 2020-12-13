const jwt = require('jwt-simple')
const secrets = require('./secrets')
const moment = require('moment')

// generate jwt token
createJWT = (user) => {
    const payload = {
        sub: user._id,
        iat: moment.unix(),
        // token is valid for two weeks
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, secrets.TOKEN_SECRET);
}

// verify the jwt
verifyJWT = (req, res, next) => {
    if (!req.header('Authorization')) {
        return res.status(401).send({ message: "Please use authorization header" })
    }

    const token = req.header('Authorization').split(' ')[1];

    try {
        payload = jwt.decode(token, secrets.TOKEN_SECRET);
    }
    catch (err) {
        return res.status(401).send({ message: err.message })
    }

    // check if token expired
    if (payload.exp <= moment.unix()) {
        return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
}

module.exports = {
    createJWT,
    verifyJWT
};