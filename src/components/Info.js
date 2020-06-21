import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Button } from 'react-bootstrap';
import './Info.css';

const s2p = s => ({
  socket: s.socket,
  end: s.end
});

const Info = ({ children }) => {
  const { socket, end } = useSelector(s2p, shallowEqual);

  const playAgain = () => {
    socket.emit('play-again');
  };

  return (
    <div className="info">
      <p className="message">{children}</p>
      {
        end && <Button variant="primary" onClick={playAgain}>Play again</Button>
      }
    </div>
  )
};

export default Info;