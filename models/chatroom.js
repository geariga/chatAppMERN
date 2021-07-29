'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const ChatroomModelSchema = new Schema({
    roomId: { type: String, required: true},
    name: { type: String, default: '', required: true },
    members: [String],
    avatar: Buffer,
    createdDate: { type: Date, default: Date.now()},
})

const Chatroom = mongoose.model('Chatroom', ChatroomModelSchema, 'chats')
module.exports = Chatroom 