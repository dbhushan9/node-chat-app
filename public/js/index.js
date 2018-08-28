
var socket = io();
socket.on('connect',function() {
  console.log('connected to server');

  // socket.emit('createEmail',{
  //   to:'abc@email.com',
  //   subject:'hello'
  // });

});

// socket.on('newEmail',function(email){
//   console.log('New Email recieved',email);
//});

socket.emit('createMessage',{
  from:'Kirito',
  text:'Sweet Dreams'
});


socket.on('newMessage',function(msg) {
  console.log('New Message',msg);
});

socket.on('disconnect',function() {
  console.log('server disconnected');
});
