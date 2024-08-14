import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//for knowing if we use ejs
app.set('view engine', 'ejs')

//the static path to the public folder
app.use(express.static('public'))

//get the homePage from home.html
app.get('/', (req, res) => {
  res.sendFile(import.meta.dirname + '/public/home.html')
})

//get the parameter Id from the url
app.get('/:idPeer', (req, res) => {
  res.render('index', { idPeer: req.params.idPeer })
})


//connection to web socket
io.on('connection', (socket) => {
  
  console.log('a user connected');

  //to get id
  socket.on('join-path', id => {
    io.emit('input-path', id)
  })

  //get parameter id and parameter from the url
  socket.on('join-room', (roomId, id) => {
    //join the socket to the room
    socket.join(roomId)
    //broadcasting it if user connected
    socket.broadcast.emit('user-connected', id)
  })
  
})

//listening HTTP
server.listen(3000, () => {
  console.log('listening on *:3000');
})