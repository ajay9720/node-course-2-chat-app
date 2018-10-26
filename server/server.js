const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User Connected');

socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));

socket.broadcast.emit('newMessage',generateMessage('Admin','New user connected'));

socket.on('createMessage',(message,callback) => {
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
});

    socket.on('createLocationMessage',(coords) =>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

    socket.on('disconnect',() => {
        console.log('user was disconnected');
    });
});

server.listen(port, () => {
    console.log("App is running on port " + port);
});