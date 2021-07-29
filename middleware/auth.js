'use strict'
const jwt = require('jsonwebtoken')

exports.authenticateToken = async function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.sendStatus(403)
        }

        req.user = user
        next()
    })
}

exports.createNewAccessToken = function (user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1800s'})
}