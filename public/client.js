const socket = io();
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

var peer = new Peer()

let localStream;
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const localPeer = document.getElementById('localPeer');
const remotePeer = document.getElementById('remotePeer');
const btn = document.getElementById('call');
localVideo.muted = true;

peer.on('open', (id) => {
  localPeer.value = id;
})

navigator.mediaDevices.getUserMedia({
  video: true,
}).then(stream => {
  localStream = stream;
  
  localVideo.srcObject = localStream;
  localVideo.onloadedmetadata = () => localVideo.play();
})

btn.addEventListener('click', () => {
  const remoteValue = remotePeer.value;

  const call = peer.call(remoteValue, localStream);
  call.on('stream', (remoteStream) => {
    remoteVideo.srcObject = remoteStream;
    remoteVideo.onloadedmetadata = () => remoteVideo.play();
  })
})

peer.on('call', (call) => {
  call.answer(localStream);
  call.on('stream', (remoteStream) => {
    remoteVideo.srcObject = remoteStream;
    remoteVideo.onloadedmetadata = () => remoteVideo.play();
  })
})
