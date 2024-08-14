const socket = io();
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

var peer = new Peer()

const generateId = document.getElementById('generateId');
const getId = document.getElementById('getId');
const callBtn = document.getElementById('callBtn');
const inputId = document.getElementById('inputId');

//get the id and emit it
peer.on('open', id => {
  socket.emit('join-path', id)
})

//add event click for generate id
generateId.addEventListener('click', () => {
  //socket from emit peer 
  socket.on('input-path', id => {
    getId.value = id;
  })
})

//add event click for the path url from input
callBtn.addEventListener('click', () => {
  const value = inputId.value;
  
  //to path url from input
  window.location.href = '/' + encodeURIComponent(value);
})