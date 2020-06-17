import React, { useState } from 'react';
import { useListeners, useInfo, useTimer } from '../hooks';
import Info from './Info';
import Arena from './Arena';
import './Game.scss';

const SCOPE_RADIUS = 300;

const Game = ({ name, socket }) => {
  const { info, waitMsg, playersMsg, 
    partialMsg, resultsMsg, closeInfo } = useInfo(),
    { time, startTimer, stopTimer, resetTimer } = useTimer(),
    [animated, setAnimated] = useState(),
  
    listeners = {
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

      partial(results) {
        partialMsg(results);
      },

      results: resultsMsg
    },

    size = SCOPE_RADIUS * 2,

    styles = {
      width: size,
      height: size
    },

    animationIteration = () => {
      info && setAnimated(false);
    };

  useListeners(socket, listeners, [
    name, waitMsg, resetTimer, playersMsg, setAnimated, 
      closeInfo, resetTimer, partialMsg,  resultsMsg
  ]);

  return (
    <div className={animated ? 'game animated' : 'game'}>
      <div className="scope" style={styles}
         onAnimationIteration={animationIteration}>
        <div className="bg">
          {
            info
              ? <Info end={info.end} socket={socket}>{info.msg}</Info>
              : <Arena {...{ socket, startTimer, stopTimer, resetTimer }} />
          }
        </div>
      </div>
      <p className="text-white timer" 
      style={{ opacity: time ? 1 : 0 }}>{time}</p>
    </div>
  )
}

export default Game;