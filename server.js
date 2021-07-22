'use strict'
// Modules
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const socketServer = require('./socket/socket')
const port = process.env.PORT || 3005
const routes = require('./routes/routes')
const auth = require('./middleware/auth')

// Instantiate socket
socketServer(server)

// Middleware
app.use(express.json())

// Routes
app.post('/api/login', routes.loginUser)
app.post('/api/register', routes.registerUser)
app.post('/api/revoke', routes.revokeToken)
app.post('/api/getuser', auth.authenticateToken, routes.getUser)
app.post('/api/getmessages/:roomid', auth.authenticateToken, routes.getMessages)

// Listen
server.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})