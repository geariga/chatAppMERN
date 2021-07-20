'use strict'
/*
    Modules
*/
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const port = process.env.PORT || 3005
const routes = require('./routes/routes')
const auth = require('./middleware/auth')

/*
    Middleware
*/
app.use(express.json())

/*
    Routes
*/
app.post('/api/login', routes.loginUser)
app.post('/api/register', routes.registerUser)
app.post('/api/revoke', routes.revokeToken)
app.post('/api/test', auth.authenticateToken, routes.test)

/*
    Socket.io
*/
io.on('connection', socket => {
    console.log('Someone connected')

    socket.on('disconnect', () => {
        console.log('Someone disconnected')
    })
})

/*
    Listen
*/
server.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})