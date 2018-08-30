
var socket = io();
socket.on('connect',function() {
  console.log('connected to server');
});

socket.on('newMessage',function(message) {

  var formattedTime = moment(message.createdAt).format("h:mm a");
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('disconnect',function() {
  console.log('server disconnected');
});

socket.on('newLocationMessage',function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href',message.url);
    li.append(a);
    $('#messages').append(li);
})

$('#message-form').on('submit',function (e){
  e.preventDefault();
  var messageTextBox = $('[name=message]');
  socket.emit('createMessage',{
    from:'User',
    text:messageTextBox.val()
  },function(){
    messageTextBox.val('')
  });
});


var locationButton = $('#send-location');
locationButton.on('click',function () {

  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled','disabled').text('Send Location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    console.log(position);
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  },function() {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('unable to share location');
  });
});
