import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();
const refs = useRef({});

function connect(socket) {
  dispatch({
    type: 'CONNECT',
    socket
  });
}

function join(name) {
  dispatch({
    type: 'JOIN',
    name
  });
}

function wait() {
  dispatch({
    type: 'WAIT',
    msg: 'Waiting for a contender...'
  });
}

// Display players
function ready(me, opponent) {
  dispatch({
    type: 'READY',
    opponent,
    msg: playersTemplate(me, opponent)
  });
}

// Close info and show game board
function start() {
  dispatch({
    type: 'START'
  });
}

function time(elapsed) {
  dispatch({
    type: 'TIME',
    elapsed
  });
}

function showVirus(virus) {
  dispatch({
    type: 'SHOW_VIRUS',
    virus
  });
}

function hideVirus(elapsed) {
  dispatch({
    type: 'HIDE_VIRUS',
    elapsed
  });
}

function partialResults(results, me) {
  dispatch({
    type: 'PARTIAL',
    msg: partialTemplate(results, me)
  })
}

function end(results, me) {
  dispatch({
    type: 'END',
    msg: endTemplate(results, me)
  })
}

function halt() {
  dispatch({
    type: 'STOP'
  })
}

function virus(virus) {
  const { current } = refs;
  current.startTime = performance.now();
  current.interval = setInterval(() => {
    time(performance.now() - current.startTime);
  }, 50);

  showVirus(virus);
}

function killVirus() {
  clearInterval(refs.current.interval);
  return hideVirus(performance.now() - refs.current.startTime)
}

// Display partial results
function partial(results, me) {
  clearInterval(refs.current.interval);
  hideVirus();

  // Delay display to sync with virus fade transition
  setTimeout(() => {
    partialResults(results, me);
  }, 200);
}

const playersTemplate = (p1, p2) =>
  <>
    {p1}<span className="text-danger"> VS </span>{p2}
  </>
;

const partialTemplate = ({ player, time }, me) => {
  const sec = (time / 1000).toFixed(2);

  return (
    <span className={me === player ? 'text-primary' : 'text-danger'}>
      {
        [player, sec].join(': ') + ' sec'
      }
    </span>
  );
};

const endTemplate = (results, me) => {
  const res = results.filter(Boolean),
    my = res.filter(r => r.player === me).length,
    theirs = res.length - my;

  if (my > theirs) {
    return `You win by ${my}-${theirs} 🎉`;
  } else if (theirs > my) {
    return `You lose by ${theirs}-${my}`;
  }
  return `Draw`;
};