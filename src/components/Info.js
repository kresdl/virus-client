import React from 'react';
import './Info.css';

const Info = ({ children }) => 
  <div className="info">
    <p>{children}</p>
  </div>
;

export default Info;