const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 8000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User Connected');



socket.emit('newMesage',{
    from:'John',
    text:'Hi',
    createdAt:123
});

socket.on('createMessage',(message) => {
    console.log('createMessage',message);
    io.emit('newMessage',{
        from:message.from,
        text:message.text,
        createdAt:new Date().getTime()
    });
});

    socket.on('disconnect',() => {
        console.log('user was disconnected');
    });
});

server.listen(port,() => {
    console.log(`server is up on ${port}`);
});