'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const MessageSchema = new Schema({
    senderId: { type: String, required: true },
    message: { type: String, default: '', required: true },
    chatRoomId: { type: String, required: true },
    timeSent: { type: Date, default: Date.now() }
})

const Message = mongoose.model('Message', MessageSchema, 'messages')
module.exports = Message