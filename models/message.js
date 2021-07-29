'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const MessageSchema = new Schema({
    sender: { type: String, required: true },
    recipients: { type: Array, default: [] },
    message: { type: String, default: '' },
    roomId: { type: String, required: true },
    timeSent: { type: Date, default: Date.now() }
})

const Message = mongoose.model('Message', MessageSchema, 'messages')
module.exports = Message