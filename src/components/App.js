import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import io from 'socket.io-client';
import { useListeners, useControls } from '../hooks';
import Connect from './Connect';
import Login from './Login';
import Game from './Game';

const s2p = s => ({
  socket: s.socket,
  name: s.name
});

const App = () => {
  const { socket, name } = useSelector(s2p, shallowEqual),
    { connect, join, wait, ready, start, virus, 
      hideVirus, partial, end } = useControls();

  const listeners = {
    join, wait, start, virus,

    inuse() {
      alert('Nick in use');
    },

    ready(opponent) {
      ready(name, opponent);
    },

    miss() {
      hideVirus();
    },

    partial(results) {
      partial(results, name);
    },

    results(results) {
      end(results, name);
    },

    disconnected() {
      alert('Disconnected due to inactivity');
    }
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL);
    socket.on('connect', () => connect(socket));
  }, [connect]);

  useListeners(socket, listeners, [
    name, join, wait, ready, start, partial, end, virus, hideVirus
  ]);

  return socket
    ? name
      ? <Game />
      : <Login />
    : <Connect />
    ;
}

export default App;