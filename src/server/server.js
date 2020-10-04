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
        const emit_data = {
            'sessionId': sessionId
        }
        socket.emit('created_session', emit_data);
    });

    socket.on('join_session', (data) => {
        const { name, sessionId } = data;
        joinSession(socket, name, sessionId);
        console.log(`Joined session`);
        const emit_data = {
            'username': name
        }
        socket.to(sessionId).emit('user_joined_session', emit_data);

        const session = sessions[sessionId];
        const emit_data_to_joiner = {
            'sessionId': sessionId,
            'participants': session.getMembers()
        }
        socket.emit('initial_joined_session', emit_data_to_joiner);
    });

    socket.on('start_session', (room) => {
        startSession(room)
        .then(activities => {
            const emit_data = {
                'activities': activities,
            }
            socket.to(room).emit('started_session', emit_data);
        });
    });
    //socket.on('swipe', swipeHandler);
    //socket.on('user_finish', finishUser);
});

const sessions = {}; //maps session 'socket room' name to the actual session


function swipeHandler(name, room, direction) {
    currSesh = sessions[room];
    currSesh.performSwipe(name, direction);

    if (currSesh.isFinished() == true) {
        matches = currSesh.getMatches();
        
        socket.to(room).emit("results", {
            results : matches,
        });
    }
};

function joinSession(socket, name, room) {
    currSesh = sessions[room];
    currSesh.addMember(name);

    socket.join(room);
};

function createSession(socket, name, category, swipes, location) {
    const findCode = (Math.floor(Math.random()*100000+1));

    while (findCode.toString() in sessions) {
        findCode++;
    }

    const code = findCode.toString();

    const newSesh = new Session(category, swipes, location); //create new session
    newSesh.setHost(name);
    newSesh.addMember(name);

    console.log(newSesh.category);
    
    sessions[code] = newSesh; //add session to session dict

    socket.join(code);

    return code;
}

async function startSession(room) {
    await sessions[room].generateActivities();

    const activities = newSesh.getActivities();

    return activities;
}

server.listen(port, function() {
    console.log("listening on port " + port);
});