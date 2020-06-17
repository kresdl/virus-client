import React from 'react';
import { Button } from 'react-bootstrap';
import './Info.css';

const Info = ({ end, children, socket }) => {
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