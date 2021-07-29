const User = require('../models/user')
const Message = require('../models/message')
const Chatroom = require('../models/chatroom')
const Token = require('../models/token')

exports.newMessage = async (message) => {
    const messageProperties = Object.keys(message)
    const requiredFields = [
        'sender', 'message', 'roomId', 'timeSent'
    ]

    if (messageProperties.length === 4 &&
        messageProperties.every(prop => requiredFields.includes(prop))    
    ) {
        try {
            const newMessage = new Message(message)
            await newMessage.save()
        } catch (e) {
            return e
        }

    } else {
        return new Error('Message document is missing properties')
    }
}