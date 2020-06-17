import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Connect from './Connect';
import Login from './Login';
import Game from './Game';

const App = () => {
  const [socket, setSocket] = useState(),
    [name, setName] = useState();

  // Connect to websocket endpoint on mount and disconnect on unmount
  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.once('connect', () => setSocket(socket));

    return () => socket.disconnect();
  }, [setSocket]);

  return socket
    ? name
      ? <Game {...{ socket, name }} />
      : <Login {... {socket, setName}} />
      
    : <Connect />
  ;
}

export default App;