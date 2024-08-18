const express = require('express');
const app = express();

const appRoute = require('./routes/xoxRoute');
const cors = require('cors');

const corsOptions = {
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

app.use('/', appRoute);

// Define a port to listen on
const PORT = 3001;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const io = require('socket.io')(server, {
    cors: true
})
io.on("connection", (socket) => {
    console.log("connected to socket.io");

    socket.on('set up', (roomData) => {
        socket.join(roomData);
        socket.emit('connection');
    });
    socket.on('new_board', (newBoard, id, user, isXNext) => {
        // console.log(newBoard,id);
        socket.in(id).emit('new_board', newBoard, user, isXNext);
    })
    socket.on('reset', (id, user) => {
        // console.log(newBoard,id);
        socket.in(id).emit('reset', user);
    })
    socket.on('send_message', (id, message,user) => {
        socket.in(id).emit('recieve_message', message,user)
    })
});
