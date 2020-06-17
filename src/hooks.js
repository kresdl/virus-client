import { useEffect, useState, useMemo, useRef } from 'react';

// Timer hook
export const useTimer = () => {
  const [time, setTime] = useState(0);
  const refs = useRef({});
  const getElapsed = () => ((performance.now() - refs.current.startTime) / 1000).toFixed(2);

  const ctrl = useMemo(() => ({
    start() {
      refs.current.startTime = performance.now();
  
      refs.current.interval = setInterval(() => {
        setTime(getElapsed());
      }, 50);
    
      setTime(0);
    },
  
    stop() {
      clearInterval(refs.current.interval);
      setTime(getElapsed());
    },

    reset() {
      clearInterval(refs.current.interval);
      setTime(0)
    }
  }), [refs, setTime]);

  return [time, ctrl];
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
  const [data, setData] = useState({}),
    players = useRef();

  const ctrl = useMemo(() => ({
    // Display waiting notification
    wait() {
      setData({ msg: 'Waiting for a contender...' });
    },

    // Display players
    players(me, opponent) {
      players.current = [me, opponent];
      const msg = playersTemplate(players.current);

      setData({ msg });
    },

    // Display partial results
    partial(results) {

      // Delay display to sync with virus fade transition
      const msg = partialTemplate(results);

      setTimeout(() => {
        setData({ msg });
      }, 200);
    },

    // Display end results
    results(results) {
      setData({
        msg: resultsTemplate(results, players.current),
        end: true
      });
    },

    // Close info and show game board
    close() {
      setData(null);
    }
  }), [setData, players]);

  return [data, ctrl];
};

// Text templetes
const playersTemplate = players => players.join(' VS ');

const partialTemplate = ({ player, time }) => {
  const sec = (time / 1000).toFixed(2);
  return [player, sec].join(': ') + 's';
};

const resultsTemplate = (results, players) => {
  const res = results.filter(Boolean),
    me = res.filter(r => r.player === players[0]).length,
    you = res.length - me;

  if (me > you) {
    return `You win by ${me}-${you} 🎉`;
  } else if (you > me) {
    return `You lose by ${you}-${me}`;
  }
  return `Draw`;
};

