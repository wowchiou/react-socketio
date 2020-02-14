const express = require('express');
const app = express();
const socketio = require('socket.io');

const server = app.listen(9000, 'localhost');
const io = socketio(server);

let history = [];

io.on('connect', socket => {
  socket.emit('get message history', history);

  socket.on('send message to server', msg => {
    history.push(msg);
    io.emit('message from server', history);
  });

  socket.on('disconnect', () => {
    io.clients((err, client) => {
      if (client.length === 0) {
        history = [];
      }
    });
  });
});
