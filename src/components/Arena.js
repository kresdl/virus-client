import React, { memo } from 'react';
import Virus from './Virus';
import './Arena.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const VIRUS_SIZE = 100;

const Arena = ({ socket, virus, setVirus, stopTimer }) => {

  const mouseDown = evt => {
    if (!virus) return;

    // Emit if hit
    const rect = evt.currentTarget.getBoundingClientRect(),
      x = evt.clientX - rect.x,
      y = evt.clientY - rect.y,
      d = Math.sqrt((virus.x - x) ** 2 + (virus.y - y) ** 2);

    if (d < VIRUS_SIZE / 2) {
      socket.emit('click', stopTimer());
      setVirus(null);
    }
  };

  return (
    <div className="arena" onMouseDown={mouseDown}>
      <TransitionGroup>
        {
          virus &&
          <CSSTransition timeout={200} classNames="virus">
            <Virus {...virus} />
          </CSSTransition>
        }
      </TransitionGroup>
    </div>
  );
}

// Momoize component to prevent rerender each timer update on parent
export default memo(Arena);