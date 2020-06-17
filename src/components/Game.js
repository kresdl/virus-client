import React from 'react';
import Info from './Info';
import Arena from './Arena';
import './Game.scss';

const SCOPE_RADIUS = 300;

const Game = ({ socket, info, virus, setVirus, stopTimer, time, animated, setAnimated }) => {

  const size = SCOPE_RADIUS * 2,

    styles = {
      width: size,
      height: size
    },

    animationIteration = () => {
      info && setAnimated(false);
    },

    formattedTime = (time / 1000).toFixed(2);

  return (
    <div className={animated ? 'game animated' : 'game'}>
      <div className="scope" style={styles}
        onAnimationIteration={animationIteration}>
        <div className="bg">
          {
            info
              ? <Info end={info.end} socket={socket}>{info.msg}</Info>
              : <Arena {...{ socket, virus, setVirus, stopTimer }} />
          }
        </div>
      </div>
      <p className="text-white timer" style={{ opacity: time ? 1 : 0 }}>
        {formattedTime}
      </p>
    </div>
  )
}

export default Game;