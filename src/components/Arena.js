import React, { memo, useState } from 'react';
import { useListeners } from '../hooks';
import Virus from './Virus';
import './Arena.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const VIRUS_SIZE = 100;

const Arena = ({ socket, startTimer, stopTimer, resetTimer }) => {
  const [virus, setVirus] = useState(),

    mouseDown = evt => {
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
    },

    listeners = {
      virus(virus) {
        startTimer();
        setVirus(virus);  
      },

      miss() {
        resetTimer();
        setVirus(null);  
      },

      partial() {
        // Has states already been updated in mouseDown listener? 
        if (!virus) return;
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