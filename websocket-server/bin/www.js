#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app.js';
import http from 'http';
import {Server} from 'socket.io';
import {startConsumer} from '../service/KafkaService.js';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Create Websocket server
 */

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

const broadcastEvents = (msg) => {
    const ROOM_NAME = 'ahorcado-room';
    const EVENT_TYPE = msg.eventType;
    delete msg.eventType;
    io.to(ROOM_NAME).emit(EVENT_TYPE, {room: ROOM_NAME, message: msg});
}

io.on('connection', socket => {
    console.log('A user connected to ws');
    socket.on('join', function (room) {
        socket.join(room);
        console.log('user joined to room: ' + room)
    });
    socket.on('disconnect', () => {
        console.log('User disconnected!');
    })

})

startConsumer().then(async (consumer) => {
    await consumer.run({
        eachMessage: ({topic, partition, message, heartbeat, pause}) => {
            broadcastEvents(JSON.parse(message.value.toString()));
            console.log(message.value.toString())
        }
    })
})

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
