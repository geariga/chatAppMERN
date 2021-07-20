'use strict'
const db = require('../db/db')
const jwt = require('jsonwebtoken')

exports.authenticateToken = async function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.JWT_SECRET, (invalid, user) => {
        if (invalid) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

exports.createNewAccessToken = function (displayName) {
    return jwt.sign(displayName, process.env.JWT_SECRET, { expiresIn: '259200s'/*'30s'*/})
}