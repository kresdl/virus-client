import React, { useEffect, useMemo } from 'react';
import { useStore, useDispatch } from 'react-redux';

// Hook that deals with responding to events by key/value lookup
export const useListeners = (emitter, listeners, dependencies) => {
  useEffect(() => {
    emitter && Object.entries(listeners).forEach(([key, val]) => {
      emitter.addEventListener(key, val);
    });

    // Remove listeners on clean up
    return () => {
      emitter && Object.entries(listeners).forEach(([key, val]) => {
        emitter.removeEventListener(key, val);
      });
    };

  }, [emitter, ...dependencies]);
}

// Game hook
export const useControls = () => {
  const dispatch = useDispatch(),
    store = useStore();

  return useMemo(() => ({
    connect(socket) {
      dispatch({
        type: 'CONNECT',
        socket
      });
    },

    // Display waiting notification
    join(name) {
      dispatch({
        type: 'JOIN',
        name
      });
    },

    wait() {
      dispatch({
        type: 'WAIT',
        msg: 'Waiting for a contender...'
      });
    },

    // Display players
    ready(me, opponent) {
      dispatch({
        type: 'READY',
        opponent,
        msg: playersTemplate(me, opponent)
      });
    },

    // Close info and show game board
    start() {
      dispatch({
        type: 'START'
      });
    },

    virus(virus) {
      const task = () => {
        dispatch({
          type: 'TIME',
          elapsed: performance.now() - 
            store.getState().startTime
        });
      };

      dispatch({
        type: 'SHOW_VIRUS',
        startTime: performance.now(),
        interval: setInterval(task, 50),
        virus
      })
    },

    hideVirus() {
      clearInterval(store.getState().interval);

      dispatch({
        type: 'HIDE_VIRUS'
      });
    },

    killVirus() {
      const { interval, startTime } = store.getState();
      clearInterval(interval);
      const elapsed = performance.now() - startTime;

      dispatch({
        type: 'HIDE_VIRUS',
        elapsed
      });

      return elapsed;
    },

    // Display partial results
    partial(results, me) {
      clearInterval(store.getState().interval);

      dispatch({
        type: 'HIDE_VIRUS',
      });

      const task = () => {
        dispatch({
          type: 'PARTIAL',
          msg: partialTemplate(results, me)
        })
      };

      // Delay task to sync with virus fade transition
      setTimeout(task, 200);
    },

    // Display end results
    end(results, me) {
      dispatch({
        type: 'END',
        msg: resultsTemplate(results, me)
      })
    },

    halt() {
      dispatch({
        type: 'STOP'
      })
    }
  }), [dispatch, store]);
};

// Text templetes

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

