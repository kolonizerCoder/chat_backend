let app = require('express')();
require('dotenv').config();
let server = require('http').createServer(app);
let io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8100",
    credentials: true
  }
});
 
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.username, event: 'left'});   
  });
 
  socket.on('set-name', (name) => {
    socket.username = name;
    io.emit('users-changed', {user: name, event: 'joined'});    
  });
  
  socket.on('send-message', (message) => {
    console.log(message);
    io.emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});    
  });
});
 
var port = process.env.PORT || 3001;
 
server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});