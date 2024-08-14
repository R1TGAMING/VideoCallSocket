const socket = io();
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

var peer = new Peer()

const generateId = document.getElementById('generateId');
const getId = document.getElementById('getId');
const callBtn = document.getElementById('callBtn');
const inputId = document.getElementById('inputId');

peer.on('open', id => {
  socket.emit('join-path', id)
})
  
generateId.addEventListener('click', () => {
  socket.on('input-path', id => {
    getId.value = id;
  })
})


callBtn.addEventListener('click', () => {
  const value = inputId.value;
  
  socket.emit('join-room', value)
  
  window.location.href = '/' + encodeURIComponent(value);
})