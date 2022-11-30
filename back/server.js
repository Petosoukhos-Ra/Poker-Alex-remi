import { Server } from "socket.io";

const io = new Server({ /* options */ });

const players = []

io.on("connection", (socket) => {
  console.log('User connected: ' + socket.id);
  socket.emit('currentPlayers',players);
  socket.broadcast.emit('newPlayer',players[socket.id]);

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
    delete players[socket.id];
    io.emit('disconnect', socket.id);
  })
});

io.listen(3000);