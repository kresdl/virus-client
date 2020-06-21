import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useControls } from '../hooks';
import Info from './Info';
import Arena from './Arena';
import './Game.scss';

const SCOPE_RADIUS = 300,
  size = SCOPE_RADIUS * 2;

const s2p = s => ({
  info: s.info,
  elapsed: s.elapsed,
  end: s.end,
  animated: s.animated,
  timer: s.virus || s.hit,
});

const Game = () => {
  const { info, elapsed, end, animated, timer } = useSelector(s2p, shallowEqual),
    { halt } = useControls(),

    styles = {
      width: size + 50,
      height: size + 50
    },

    animationIteration = () => {
      end && halt();
    };

  return (
    <div className={animated ? 'game animated' : 'game'}>
      <div className="wrapper" style={styles}>
        <div className="scope"
          onAnimationIteration={animationIteration} />
        <div className="bg">
          {
            info
              ? <Info>{info}</Info>
              : <Arena />
          }
        </div>
      </div>
      <p className="text-white timer" 
        style={{ visibility: timer ? 'visible' : 'hidden' }}>
        {(elapsed / 1000).toFixed(2)}
      </p>
    </div>
  )
}

export default Game;