const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const { Session } = require('./session');

const app = express();

const port = 4000;
const server = http.createServer(app);

const io = socketio(server);


io.on('connection', socket => {
    console.log('User connected!', socket.id);

    socket.on('create_session', (data) => {
        const { name, activityType, numSwipes } = data;
        const sessionId = createSession(socket, name, activityType, numSwipes);
        const session = sessions[sessionId];
        console.log(`New session created with id ${sessionId}, activity type ${session.getCategory()}, ${session.getNumActivites()} activities`);
    });
    //socket.on('join_session', joinSession);
    //socket.on('swipe', swipeHandler);
    //socket.on('user_finish', finishUser);
});

const sessions = {} //maps session 'socket room' name to the actual session

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

    const newSesh = new Session(category, swipes); //create new session
    
    newSesh.setHost(name);
    newSesh.addMember(name);

    sessions[code] = newSesh; //add session to session dict

    socket.join(code);

    return code;
}

server.listen(port, function() {
    console.log("listening on port " + port);
});