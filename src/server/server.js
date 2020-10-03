const express = require('express');
const socketio = require('socket.io');

const Session = require('./session')

const app = express();


const port = process.env.PORT || 3000;
const server = app.listen(port);

const io = socketio(server);

io.on('connection', socket => {
    console.log('User connected!', socket.id);
    
    socket.on(Constants.MSG_TYPES.JOIN_SESSION, joinSession);
    socket.on(Constants.MSG_TYPES.INPUT, handleInput);
    socket.on('disconnect', onDisconnect);
});



const session = new Session();



