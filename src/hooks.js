import { useEffect, useState, useMemo } from 'react';

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
  const [info, setInfo] = useState(initial);

  const controller = useMemo(() => ({
    players(p) {
      setInfo(
        playersTemplate(p)
      );
    },

    partial(results) {
      setInfo(
        partialResultsTemplate(results)
      );
    },

    results(results, nick) {
      setInfo(
        resultsTemplate(results, nick)
      );
    },

    close() {
      setInfo(null);
    }
  }), [setInfo]);

  return [info, controller];
};

const playersTemplate = players => players.join(' VS ');

const partialResultsTemplate = ({ player, time }) => {
  const sec = (time / 1000).toFixed(2);
  return [player, sec].join(': ') + 's';
};

const resultsTemplate = (results, nick) => {
  debugger;
  const res = Object.entries(results
    .reduce((acc, e) => ({
      ...acc,
      [e.player]: (acc[e.player] || 0) + 1
    }), {})
  );

  const [me, you] = res[0][0] === nick
    ? [res[0][1], res[1][1]]
    : [res[1][1], res[0][1]];

  if (me > you) {
    return `You win by ${me}-${you}!`;
  } else if (you > me) {
    return `You lose by ${you}-${me}`;
  }
  return `Draw`;
};

