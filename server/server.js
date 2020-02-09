const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
app.set('view engine', 'hbs');

var emitirfn=function emitirfn() {
  console.log('pubsub', 'dsds');
  //io.emit('mariano', generateMessage("pubsun", "xxxxxx","auto server"));
  return false;
  
}


io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('Crea mensaje server', message);
    io.emit('newMessage', generateMessage(message.from, message.text,message.type));
    callback('This is from the server.');
    
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

  socket.on('mariano', (message, callback) => {
    console.log('Mensaje Mariano', message);
    io.emit('mariano', generateMessage("respuesta Mariano", "xxxxxx","auto server"));
    
  });

/*

  var emitirfn=function emitirfn() {
    console.log('pubsub', 'dsds');
    io.emit('mariano', generateMessage("pubsun", "xxxxxx","auto server"));
    return false;
    
  }

*/


});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});


app.get('/about', (req, res) => {
  console.log(`nueva página`);
  var redis = require('redis');
  var client = redis.createClient();
  
  
  

// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 

client.on("error", function (err) {
  console.log("Error " + err);
});


client.set("clave", "valor", redis.print);
client.set("clave2", "valor2", redis.print);
client.get("clave", redis.print);
client.get("clave2", redis.print);

//Esta es la parte de mensajería pub/sub
client.subscribe("canal1");
///client.quit();
client.on("message", function(channel, message) {
  console.log("Recibo mensaje '" + message + "' on channel '" + channel + "' arrived!");
  emitirfn();
  //callback('This is from the server.');
});

  
res.send({
    errorMessage: 'entro claves redis al sistema'
});
  
});


app.get('/pagina1', (req, res) => {
  
  res.render( 'pagina1.hbs');
  
});



