import React from 'react';
import { useListeners, useInfo } from '../hooks';
import Info from './Info';
import Arena from './Arena';
import './Game.css';

const SCOPE_RADIUS = 300;

const Game = ({ name, socket }) => {
  const [info, control] = useInfo(),
  
    listeners = {
      wait: control.wait,
      ready: opponent => control.players(name, opponent),
      start: control.close,
      partial: control.partial,
      results: control.results
    },

    size = SCOPE_RADIUS * 2,

    styles = {
      width: size,
      height: size
    };

  useListeners(socket, listeners, [control])

  return (
    <div className="game">
      <div className="scope" style={styles}>
        {
          info
          ? <Info end={info.end} socket={socket}>{info.msg}</Info>
          : <Arena socket={socket} />
        }
      </div>
    </div>
  )
}

export default Game;