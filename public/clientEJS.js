const socket = io();

import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

var peer = new Peer()

//localStrem to store the stream navigator
let localStream;

const videoGrid = document.getElementById('videoGrid');
const localVideo = document.createElement('video');

//get the ID user and the params url
peer.on('open', id => {
  socket.emit('join-room', paramsId, id)
})

//get permission camera for video call
navigator.mediaDevices.getUserMedia({
  video: true,
}).then(stream => {
  //if allowed localVideo / video will get the source stream
  localStream = stream;
  localVideo.srcObject = localStream;

  //localVideo can play automatically then append to videoGrid
  localVideo.onloadedmetadata = () => {
    localVideo.play();
  }
  videoGrid.append(localVideo);
  
})

//to call from other user
socket.on('user-connected', id => {
  //to call if the user on the room
  const call = peer.call(id, localStream);

  const localVideo = document.createElement('video');

  //if the user is on room will stream it and append the video to videoGrid
  call.on('stream', remoteStream => {
    localVideo.srcObject = remoteStream;
    localVideo.onloadedmetadata = () => {
      localVideo.play()
    }
    videoGrid.append(localVideo);
  })
})

//to answer the call from other user
peer.on('call', call => {
  //to answer the call if the user on the room
  call.answer(localStream);
  const localVideo = document.createElement('video');

  //if the user is on room will stream it and append the video to videoGrid
  call.on('stream', remoteStream => {
    localVideo.srcObject = remoteStream;
    localVideo.onloadedmetadata = () => {
      localVideo.play()
    }
    videoGrid.append(localVideo);
  })
})