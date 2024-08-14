import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(import.meta.dirname + '/public/home.html')
})

app.get('/:idPeer', (req, res) => {
  res.render('index', { idPeer: req.params.idPeer })
})



io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join-path', id => {
    io.emit('input-path', id)
  })
  socket.on('join-room', (roomId, id) => {
    socket.join(id)
    socket.broadcast.emit('user-connected', id)
  })
  
})

server.listen(3000, () => {
  console.log('listening on *:3000');
})