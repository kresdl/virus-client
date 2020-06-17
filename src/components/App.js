import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useListeners, useInfo, useTimer } from '../hooks';
import Connect from './Connect';
import Login from './Login';
import Game from './Game';

const App = () => {
  const [socket, setSocket] = useState(),
    [name, setName] = useState(),
    { info, waitMsg, playersMsg,
      partialMsg, resultsMsg, closeInfo } = useInfo(),
    { time, startTimer, stopTimer, resetTimer } = useTimer(),
    [virus, setVirus] = useState(),
    [animated, setAnimated] = useState(),

    listeners = {
      joined(name) {
        setName(name)
      },

      inuse() {
        alert('Nick in use');
      },

      wait() {
        waitMsg();
        resetTimer();
      },

      ready(opponent) {
        playersMsg(name, opponent);
      },

      start() {
        setAnimated(true);
        closeInfo();
        resetTimer();
      },

      virus(virus) {
        startTimer();
        setVirus(virus);
      },

      miss() {
        resetTimer();
        setVirus(null);
      },

      partial(results) {
        stopTimer();
        setVirus(null);
        partialMsg(results);
      },

      results(results) {
        resetTimer();
        setVirus(null);
        resultsMsg(results);
      }
    };

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('connect', () => setSocket(socket));
  }, [setSocket]);

  useListeners(socket, listeners, [
    name, waitMsg, startTimer, playersMsg, setAnimated, setName,
    closeInfo, stopTimer, resetTimer, partialMsg, resultsMsg, setVirus
  ]);

  return socket
    ? name
      ?
      <Game {...{
        socket, info, virus, setVirus,
        stopTimer, time, animated, setAnimated
      }} />
      
      : <Login {... { socket }} />

    : <Connect />
  ;
}

export default App;