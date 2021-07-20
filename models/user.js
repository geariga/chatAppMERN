'use strict'
const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    displayName: {
        type: String,
        default: '',
        unique: true,
        required: true
    },
    password: { type: String, required: true },
    joinDate: { type: Date, default: Date.now() },
    avatar: Buffer
})

const User = mongoose.model('User', userSchema, 'users')
module.exports = User