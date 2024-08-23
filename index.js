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

    socket.on('set up', (roomData, user) => {
        socket.join(roomData);
        socket.join(user);
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
    socket.on('send_message', (id, message, user) => {
        socket.in(id).emit('recieve_message', message, user)
    })

    socket.on("leave", (id) => {
        socket.leave(id);
        console.log(`left from room:${id}`)
    })


    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on("video_chat", (user, id) => {
        socket.in(id).emit('connect_chat', user)
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from })
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })
    socket.on("callEnd", (id) => {
        socket.in(id).emit("callEnd")
    })
});
