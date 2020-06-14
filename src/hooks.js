import { useEffect, useState, useMemo, useRef } from 'react';

export const useListeners = (emitter, listeners, dependencies) => {
  const memoized = useMemo(() => listeners, dependencies);

  useEffect(() => {
    Object.entries(memoized).forEach(([key, val]) => {
      emitter.addEventListener(key, val);
    });

    return () => {
      Object.entries(memoized).forEach(([key, val]) => {
        emitter.removeEventListener(key, val);
      })
    };
  }, [emitter, memoized])
};

export const useInfo = initial => {
  const [info, setInfo] = useState(initial),
    players = useRef();

  const controller = useMemo(() => ({
    players(me, opponent) {
      players.current = [me, opponent];

      setInfo(
        playersTemplate(players.current)
      );
    },

    wait() {
      setInfo('Waiting for a contender...');
    },

    partial(results) {
      setInfo(
        partialTemplate(results)
      );
    },

    results(results) {
      setInfo(
        resultsTemplate(results, players.current)
      );
    },

    close() {
      setInfo(null);
    }
  }), [setInfo]);

  return [info, controller];
};

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

