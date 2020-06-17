import React, { memo, useState } from 'react';
import { useListeners } from '../hooks';
import Virus from './Virus';
import './Arena.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Arena = ({ socket, startTimer, stopTimer, resetTimer }) => {
  const [virus, setVirus] = useState(),

    mouseDown = evt => {
      if (!virus) return;

      // Emit local space coordinates
      const rect = evt.currentTarget.getBoundingClientRect(),
        x = evt.clientX - rect.x,
        y = evt.clientY - rect.y;

      socket.emit('click', { x, y });
    },

    listeners = {
      virus(virus) {
        startTimer();
        setVirus(virus);  
      },

      miss() {
        stopTimer();
        setVirus(null);  
      },

      partial() {
        stopTimer();
        setVirus(null);  
      },

      results() {
        resetTimer();
        setVirus(null);
      }
    };

  useListeners(socket, listeners, [setVirus, startTimer, stopTimer]);

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