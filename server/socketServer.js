const express = require('express');
const app = express();
const socketio = require('socket.io');

const server = app.listen(9000, 'localhost');
const io = socketio(server);

let members = [];
let history = [];

io.on('connect', socket => {
  console.log('client connected');
  socket.on('start', user => {
    console.log(user);
  });

  socket.on('disconnect', () => {
    console.log('disconnect socket server');
  });
});
