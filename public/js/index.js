var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('mariano', function (message) {
  console.log('Llega mensaje mariano: ' + message.from + " " + message.text);
});


socket.on('newMessage', function (message) {
  console.log('Nuevo mensaje index.js', message);
  var li = jQuery('<li></li>');
  li.text(`Nuevo mensaje -> ${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
  //jQuery('#datos').append(message.text);

  jQuery('#datos').text(message.text);
  jQuery('#datos2').text(message.from);
  jQuery('#datos4').text(message.type);
  
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val(),
    type: jQuery('#1').val()
  }, function () {

  });
});
