import React, { useState } from 'react';
import { useListeners } from '../hooks';
import Virus from './Virus';
import './Arena.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Arena = ({ socket }) => {
  const [virus, setVirus] = useState(),

    mouseDown = evt => {
      if (!virus) return;

      // Emit local space coordinates
      const rect = evt.currentTarget.getBoundingClientRect(),
        x = evt.clientX - rect.x,
        y = evt.clientY - rect.y;

      socket.emit('click', { x, y });
    },

    clearVirus = () => setVirus(null),

    listeners = {
      virus: setVirus,
      miss: clearVirus,
      partial: clearVirus,
      results: clearVirus
    };

  useListeners(socket, listeners, [setVirus]);

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

export default Arena;