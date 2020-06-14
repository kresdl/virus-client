import { useEffect, useState, useMemo, useRef } from 'react';

// Hook that deals with responding to multiple 
// events by key/value lookup
export const useListeners = (emitter, listeners, dependencies) => {
  const memoized = useMemo(() => listeners, dependencies);

  useEffect(() => {
    Object.entries(memoized).forEach(([key, val]) => {
      emitter.addEventListener(key, val);
    });

    //Cleanup
    return () => {
      Object.entries(memoized).forEach(([key, val]) => {
        emitter.removeEventListener(key, val);
      })
    };
  }, [emitter, memoized])
};

// Hook to change display
export const useInfo = () => {
  const [info, setInfo] = useState({}),
    players = useRef();

  const control = useMemo(() => ({

    // Display waiting notification
    wait() {
      setInfo({ msg: 'Waiting for a contender...' });
    },

    // Display players
    players(me, opponent) {
      players.current = [me, opponent];
      const msg = playersTemplate(players.current);

      setInfo({ msg });
    },

    // Display partial results
    partial(results) {

      // Delay display to sync with virus fade transition
      const msg = partialTemplate(results);

      setTimeout(() => {
        setInfo({ msg });
      }, 200);
    },

    // Display end results
    results(results) {
      setInfo({
        msg: resultsTemplate(results, players.current),
        end: true
      });
    },

    // Close info and show game board
    close() {
      setInfo(null);
    }
  }), [setInfo]);

  return [info, control];
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

