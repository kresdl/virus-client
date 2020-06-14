import React from 'react';
import { useListeners, useInfo } from '../hooks';
import Info from './Info';
import Arena from './Arena';
import './Game.css';

const SCOPE_RADIUS = 300;

const Game = ({ name, socket }) => {
  const [info, setInfo] = useInfo(),
    listeners = {
      wait: setInfo.wait,
      ready: opponent => setInfo.players(name, opponent),
      start: setInfo.close,
      partial: setInfo.partial,
      results: setInfo.results
    },

    size = SCOPE_RADIUS * 2,

    styles = {
      width: size,
      height: size
    };

  useListeners(socket, listeners, [setInfo])

  return (
    <div className="game">
      <div className="scope" style={styles}>
        {
          info
          ? <Info>{info}</Info>
          : <Arena socket={socket} />
        }
      </div>
    </div>
  )
}

export default Game;