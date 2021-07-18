const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var socketList = [];
var convoTracker = {
    convoId: "testConvo123",
    chatList: [
        {timestamp: "2021-00-00:11231234", 
         sender: "Ryan",
         message: "Good"
        }
    ]
}
io.on('connection', (socket) => {
  console.log(socket.id);
  console.log('a user connected');
  socketList.push(socket);

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    socketList.map( s=> {
        s.emit('test message', "Got your message: " + msg);
    })
    
  });
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});