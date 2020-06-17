import React, { useState } from 'react';
import { useListeners, useInfo, useTimer } from '../hooks';
import Info from './Info';
import Arena from './Arena';
import './Game.scss';

const SCOPE_RADIUS = 300;

const Game = ({ name, socket }) => {
  const [info, infoCtrl] = useInfo(),
    [time, timerCtrl] = useTimer(),
    [animated, setAnimated] = useState(),
  
    listeners = {
      wait() {
        infoCtrl.wait();
        timerCtrl.reset();
      },

      ready(opponent) {
        infoCtrl.players(name, opponent);
      },

      start() {
        setAnimated(true);
        infoCtrl.close();
        timerCtrl.reset();
      },

      partial(results) {
        infoCtrl.partial(results);
      },

      results: infoCtrl.results
    },

    size = SCOPE_RADIUS * 2,

    styles = {
      width: size,
      height: size
    },

    animationIteration = () => {
      info && setAnimated(false);
    };

  useListeners(socket, listeners, [name, infoCtrl, timerCtrl]);

  return (
    <div className={animated ? 'game animated' : 'game'}>
      <div className="scope" style={styles}
         onAnimationIteration={animationIteration}>
        <div className="bg">
          {
            info
              ? <Info end={info.end} socket={socket}>{info.msg}</Info>
              : <Arena socket={socket} startTimer={timerCtrl.start} 
                  stopTimer={timerCtrl.stop} resetTimer={timerCtrl.reset} />
          }
        </div>
      </div>
      <p className="text-white timer" 
      style={{ opacity: time ? 1 : 0 }}>{time}</p>
    </div>
  )
}

export default Game;