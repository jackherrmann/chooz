const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const { Session } = require('./session');

const app = express();

const port = 4000;
const server = http.createServer(app);

const io = socketio(server);

const {yelpSearch} = require('../yelp-api/yelpSearch');

io.on('connection', socket => {
    console.log('User connected!', socket.id);

    socket.on('create_session', (data) => {
        const { name, activityType, numSwipes, location, params } = data;
        console.log(data)
        const sessionId = createSession(socket, name, activityType, numSwipes, location, params);
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

        const newSesh = sessions[room];

        yelpSearch(newSesh.category, newSesh.location.latitude, newSesh.location.longitude, newSesh.params)
        .then((businesses) => {
            console.log('first business');
            var c = 0;
            
            for (var b of businesses) { 
                if (c == newSesh.numActivities) {
                    break;
                }
                
                const activity = {
                    name : b.name,
                    cuisine : b.categories[0].title,
                    url : b.url,
                    image_url : b.image_url,
                    rating : b.rating,
                    price : b.price,
                    location : b.location.display_address[0] + ", " + b.location.display_address[1],
                }

                newSesh.activities.push(activity);
                c++;
            }

            // return newSesh.activities;

            const emit_data = {
                activities: newSesh.activities,
            }
            console.log(emit_data.activities);
            socket.to(room).emit('started_session', emit_data);
        });
    });

    socket.on('process_swipes', (room, name, userSwipes) => {
        processSwipes(room, name, userSwipes)
        const emit_data = {
            message: 'Swipes processed!',
        }
        socket.emit('processed_swipes', emit_data);

        if (isFinished()) {
            const matches = getMatches(room);
            const emit_results = {
                matches : matches
            }
            socket.to(room).emit('finished_all', emit_results);
        }
    });

    //socket.on('user_finish', finishUser);
});

const sessions = {}; //maps session 'socket room' name to the actual session



function joinSession(socket, name, room) {
    currSesh = sessions[room];
    currSesh.addMember(name);

    socket.join(room);
};

function createSession(socket, name, category, swipes, location, params) {
    const findCode = (Math.floor(Math.random()*100000+1));

    while (findCode.toString() in sessions) {
        findCode++;
    }

    const code = findCode.toString();

    const newSesh = new Session(category, swipes, location, params); //create new session
    newSesh.setHost(name);
    newSesh.addMember(name);

    console.log(newSesh.category);
    
    sessions[code] = newSesh; //add session to session dict

    socket.join(code);

    return code;
}

function processSwipes(room, name, userSwipes) {
    const currSesh = sessions[room];

    currSesh.processSwipes(name, userSwipes);
}

function isFinished(room) {
    currSesh = sessions[room];
    return currSesh.isFinished();
}

function getMatches(room) {
    currSesh = sessions[room];
    return currSesh.getMatches();
}

server.listen(port, function() {
    console.log("listening on port " + port);
});