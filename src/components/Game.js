import React from 'react';
import { useListeners, useInfo, useTimer } from '../hooks';
import Info from './Info';
import Arena from './Arena';
import './Game.css';

const SCOPE_RADIUS = 300;

const Game = ({ name, socket }) => {
  const [info, infoCtrl] = useInfo(),
    [time, timerCtrl] = useTimer(),
  
    listeners = {
      wait() {
        infoCtrl.wait();
        timerCtrl.reset();
      },
      ready(opponent) {
        infoCtrl.players(name, opponent);
      },
      start() {
        infoCtrl.close();
        timerCtrl.reset();
      },
      partial: infoCtrl.partial,
      results: infoCtrl.results
    },

    size = SCOPE_RADIUS * 2,

    styles = {
      width: size,
      height: size
    };

  useListeners(socket, listeners, [name, infoCtrl, timerCtrl])

  return (
    <div className="game">
      <div className="scope" style={styles}>
        <div className="bg">
          {
            info
              ? <Info end={info.end} socket={socket}>{info.msg}</Info>
              : <Arena socket={socket} startTimer={timerCtrl.start} 
                  stopTimer={timerCtrl.stop} />
          }
        </div>
      </div>
      <p className="text-white timer">{time}</p>
    </div>
  )
}

export default Game;