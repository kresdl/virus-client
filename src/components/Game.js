import React from 'react';
import { useListeners, useInfo } from '../hooks';
import Info from './Info';
import Arena from './Arena';
import './Game.css';

const SCOPE_RADIUS = 300;

const Game = ({ nick, socket }) => {
  const [info, setInfo] = useInfo('Waiting for a contender...'),

    listeners = {
      ready: players => setInfo.players(players),
      start: () => setInfo.close(),
      results: results => setInfo.partial(results),
      end: results => setInfo.results(results, nick)
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
          ? <Info text={info} />
          : <Arena socket={socket} />
        }
      </div>
    </div>
  )
}

export default Game;