const express = require('express');
const socketio = require('socket.io');

const Session = require('./session');
const Chooser = require('./chooser');

const app = express();
const http = require('http').Server(app);

const port = 3000;
const server = app.listen(port);

const io = socketio(server);

io.on('connection', socket => {
    console.log('User connected!', socket.id);

    socket.on('create_session', createSession);
    socket.on('join_session', joinSession);
    socket.on('swipe', swipeHandler);
    socket.on('user_finish', finishUser);
});


const sessions = {} //maps session 'socket room' to the actual session

function swipeHandler(name, room, direction) {
    currSesh = sessions[room];
    currSesh.performSwipe(name, direction);

    if (currSesh.isFinished() == true) {
        matches = currSesh.getMatches();
        
        socket.to(room).emit("results", {
            results : matches,
        });
    }
}

function joinSession(socket, name, room) {
    currSesh = sessions[room];
    currSesh.addChooser(name);

    socket.join(room);
}

function createSession(socket, name, category, swipes) {
    const code = (Math.floor(Math.random()*100000+1)).toString();

    newSesh = new Session(category, swipes); //create new session
    
    newSesh.setHost(name);
    newSesh.addChooser(name);

    sessions[code] = newSesh; //add session to session dict

    socket.join(code);
}

http.listen(port, function() {
    console.log("listening on port " + port);
});