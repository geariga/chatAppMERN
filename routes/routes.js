'use strict'
const db = require('../db/db')
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
const User = require('../models/user')
const Chatroom = require('../models/chatroom')
const Token = require('../models/token')

/*
    Establish database connection
*/
db.connect()

exports.loginUser = async (req, res) => {
    const user = {displayName: req.body.displayName}
    const pwd = req.body.password
    try {
        const currentUser = await db.getUser(user.displayName)
        if (await bcrypt.compare(pwd, currentUser[0].password)) {
            const accessToken = auth.createNewAccessToken(user)
            res.status(200).json({token: accessToken})
        } else {
            res.status(403).send({status: 'incorrect password'})
        }
    } catch (e) {
        res.status(400).send({error: e.message})
    }
}

exports.revokeToken = async (req, res) => {
    const token = req.body.token
    try {
        const revokedToken = new Token({
            token: token
        })
        await revokedToken.save()
        res.status(201).send({status: 'success'})
    } catch ( e ) {
        res.status(500).send({error: e.message})
    }
}

exports.registerUser = async (req, res) => {
    const displayName = req.body.displayName
    const password = req.body.password
    try {
        const hashedPwd = await bcrypt.hash(password, 12)
        const newUser = new User({
            userId: uuidv4(),
            displayName: displayName,
            password: hashedPwd
        })
        await newUser.save()
        res.status(201).send({status: 'success'})
    } catch ( e ) {
        res.status(500).send({error: e.message})
    }
}

exports.test = (req, res) => {
    console.log(req.user)
}