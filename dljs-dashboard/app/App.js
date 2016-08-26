import React from 'react';
import socketIo from 'socket.io-client';

import Logger from './components/Logger';
import Input from './components/Input';

const socket = socketIo(process.env.socketUrl)
.on('connect', () => console.log('connected!'))
.on('reconnect', () => console.log('re-connected!'));

export default () => (
  <div>
    <h1>DLJS dashboard</h1>
    <Logger socket={socket} />
    <Input socket={socket} />
  </div>
);
