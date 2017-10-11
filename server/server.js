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
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});


app.get('/about', (req, res) => {
  console.log(`nueva página`);
  res.send({
    errorMessage: 'entro'
  });
  
});


app.get('/pagina1', (req, res) => {
  
  res.render( 'pagina1.hbs');
  
});

