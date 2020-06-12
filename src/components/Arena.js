import React, { useState } from 'react';
import { useListeners } from '../hooks';
import Virus from './Virus';
import './Arena.css';

const Arena = ({ socket }) => {
  const [virus, setVirus] = useState(),

    mouseDown = evt => {
      if (!virus) return;

      const rect = evt.currentTarget.getBoundingClientRect(),
        x = evt.clientX - rect.x,
        y = evt.clientY - rect.y;

      socket.emit('click', { x, y });
    },

    listeners = { 
      virus: setVirus,
      miss: setVirus
    };

  useListeners(socket, listeners, [setVirus]);

  return (
    <div className="arena" onMouseDown={mouseDown}>
      {
        virus ? <Virus {...virus} /> : null
      }
    </div>
  );
}

export default Arena;