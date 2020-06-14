import React from 'react';
import './Virus.css';

const VIRUS_SIZE = 100;

// Get virus svg-urls
const ctx = require.context('../images'),
  keys = ctx.keys(),
  urls = keys.map(ctx);

const Virus = ({ x, y, variant }) => {  
  const styles = { 
    backgroundImage: `url(${urls[variant]})`,
    left: x - VIRUS_SIZE / 2,
    top: y - VIRUS_SIZE / 2,
    width: VIRUS_SIZE,
    height: VIRUS_SIZE
  };

  return (
    <div className="virus" style={styles} />
  );
};

export default Virus;