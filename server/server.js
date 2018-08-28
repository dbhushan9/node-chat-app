const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');


const publicPath =  path.join(__dirname,'../public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath ));


io.on('connection',(socket)=>{
  console.log('new user connected');

  // socket.emit('newEmail',{
  //   from:'Bhushan.vom',
  //   text:'how are u?',
  //   createAt:123
  // });
  // socket.on('createEmail',(newEmail)=>{
  //   console.log('createEmail',newEmail);
  // });

  socket.emit('newMessage',{
    from:"bhushan",
    text:"good night",
    createdAt:12345
  });

  socket.on('createMessage',(newMsg)=>{
    console.log('New Message created',newMsg);
  });



  socket.on('disconnect',()=>{
    console.log('user disconnected');
  });
});

server.listen(port,()=>{
  console.log(`Server is up on ${port}`);
})
