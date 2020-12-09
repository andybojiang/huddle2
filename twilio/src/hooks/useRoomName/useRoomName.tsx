import { useEffect } from 'react';

const crypto = require('crypto');

export default function useRoomName() {
  const match = window.location.search.match(/roomName=(.*)&?/);
  const roomName = match ? match[1] : window.sessionStorage.getItem('roomName');
  var first = true;

  // useEffect(() => {

  // }, [])

  if (roomName) {
    window.sessionStorage.setItem('roomName', roomName);
    first = false;
    return [roomName, first];
  } else {
    let d = new Date();
    const text = d.toString();
    var random = Math.random().toString();
    var val = crypto
      .createHash('sha1')
      .update(text + random)
      .digest('hex');

    window.sessionStorage.setItem('roomName', val);
    first = true;
    return [val, first];
  }
}
