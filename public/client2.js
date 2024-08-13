const socket = io();

import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

var peer = new Peer()

let localStream;
const videoGrid = document.getElementById('videoGrid');
const localVideo = document.createElement('video');
const remoteVideo = document.createElement('video');
const idPeer = document.getElementById('idPeer');

peer.on('open', (id) => {
  socket.emit('join-room', paramsId, id);
  idPeer.innerHTML = 'Here your ID : ' + id;
})

navigator.mediaDevices.getUserMedia({
  video: true,
}).then(stream => {
  localStream = stream;
  localVideo.srcObject = localStream;

  localVideo.onloadedmetadata = () => {
    localVideo.play();
  }
  videoGrid.append(localVideo);
  
})

socket.on('user-connected', id => {
  const call = peer.call(id, localStream);

  const localVideo = document.createElement('video');

  call.on('stream', remoteStream => {
    localVideo.srcObject = remoteStream;
    localVideo.onloadedmetadata = () => {
      localVideo.play()
    }
    videoGrid.append(localVideo);
  })
})

peer.on('call', call => {
  call.answer(localStream);
  const localVideo = document.createElement('video');

  call.on('stream', remoteStream => {
    localVideo.srcObject = remoteStream;
    localVideo.onloadedmetadata = () => {
      localVideo.play()
    }
    videoGrid.append(localVideo);
  })
})