const express = require('express');
const app = express();
const socketio = require('socket.io');

const server = app.listen(9000, 'localhost');
const io = socketio(server);

let members = [];
let history = [];

io.on('connect', socket => {
  let member = {};
  socket.on('login', memberData => {
    member = memberData;
    recordMember(member);
    io.emit('set members in room', members);
  });

  socket.on('disconnect', () => {
    const newMembers = members.filter(itm => {
      return member.id !== itm.id;
    });
    members = newMembers;
    io.emit('set members in room', members);
    socket.emit('close socket');
    console.log(members);

    // io.clients((err, client) => {
    //   if (client.length === 0) {
    //     history = [];
    //   }
    // });
  });
});

function recordMember(data) {
  if (members.length === 0) {
    members.push(data);
  } else {
    let newMembers = members.filter(member => {
      return member.id !== data.id;
    });
    newMembers.push(data);
    members = newMembers;
  }
}
