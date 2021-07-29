'use strict'
const mongoose = require('mongoose')
const { Schema } = mongoose

const TokenModelSchema = new Schema({
    created: {type: Date, expires: 1800, default: Date.now()},
    token: {type: String, required: true}
})

const Token = mongoose.model('Token', TokenModelSchema, 'tokens_blacklist')
module.exports = Token