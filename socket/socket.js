'use strict'
const { Server } = require('socket.io')
const useModel = require('../db/useModel')

module.exports = (httpServer) => {
    // Instantiate socket
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://127.0.0.1:3000',
            methods: ['GET', 'POST']
        }
    })
    
    // Handle socket events
    const socketHandler = (socket) => {
        socket.broadcast.emit('connection')
    
        socket.on('send_message', async message => {
            io.emit('send_message', message)
            try {
                await useModel.newMessage(message)
            } catch (e) {
                console.log({error: e.message})
            }
        })
    
        socket.on('disconnect', () => {
            console.log('Someone disconnected')
        })
    }

    // Listen
    io.on('connection', socketHandler)
}