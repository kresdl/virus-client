import React, { useEffect, useState, useMemo, useRef } from 'react';

// Timer hook
export const useTimer = () => {
  const [time, setTime] = useState(0);
  const refs = useRef({});
  
  const getElapsed = () => performance.now() - refs.current.startTime;

  const ctrl = useMemo(() => ({
    startTimer() {
      refs.current.startTime = performance.now();
  
      refs.current.interval = setInterval(() => {
        setTime(getElapsed());
      }, 50);
    
      setTime(0);
    },
  
    stopTimer() {
      clearInterval(refs.current.interval);
      const elapsed = getElapsed();
      setTime(elapsed);
      return elapsed;
    },

    resetTimer() {
      clearInterval(refs.current.interval);
      setTime(0)
    }
  }), [refs, setTime]);

  return { time, ...ctrl };
}

// Hook that deals with responding to multiple 
// events by key/value lookup
export const useListeners = (emitter, listeners, dependencies) => {
  useEffect(() => {
    Object.entries(listeners).forEach(([key, val]) => {
      emitter.addEventListener(key, val);
    });

    //Cleanup
    return () => {
      Object.entries(listeners).forEach(([key, val]) => {
        emitter.removeEventListener(key, val);
      })
    };
  }, [emitter, ...dependencies])
};

// Hook to deal with messages
export const useInfo = () => {
  const [info, setInfo] = useState(),
    players = useRef();

  const ctrl = useMemo(() => ({
    // Display waiting notification
    waitMsg() {
      setInfo({ msg: 'Waiting for a contender...' });
    },

    // Display players
    playersMsg(me, opponent) {
      players.current = [me, opponent];
      const msg = playersTemplate(players.current);

      setInfo({ msg });
    },

    // Display partial results
    partialMsg(results) {
      // Delay display to sync with virus fade transition
      const msg = partialTemplate(results, players.current[0]);

      setTimeout(() => {
        setInfo({ msg });
      }, 200);
    },

    // Display end results
    resultsMsg(results) {
      setInfo({
        msg: resultsTemplate(results, players.current[0]),
        end: true
      });
    },

    // Close info and show game board
    closeInfo() {
      setInfo(null);
    }
  }), [setInfo, players]);

  return { info, ...ctrl };
};

// Text templetes

const playersTemplate = ([p1, p2]) => 
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

const resultsTemplate = (results, me) => {
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

