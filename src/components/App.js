import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Connect from './Connect';
import Login from './Login';
import Game from './Game';

const App = () => {
  const [socket, setSocket] = useState(),
    [nick, setNick] = useState();

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.once('connect', () => setSocket(socket));
  }, [setSocket]);

  return socket
    ? nick
      ? <Game socket={socket} nick={nick} />
      : <Login socket={socket} setNick={setNick} />
      
    : <Connect />
  ;
}

export default App;