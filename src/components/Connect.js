import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Connect.css';

const Connect = () =>
  <div className="connect">
    <Spinner animation="border" role="status">
      <span className="sr-only">Connecting...</span>
    </Spinner>
  </div>
;

export default Connect;