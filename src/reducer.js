export default {
  socket: (state = null, { type, socket }) => {
    switch (type) {
      case 'CONNECT': return socket;
      default: return state;
    }
  },

  name: (state = null, { type, name }) => {
    switch (type) {
      case 'JOIN': return name;
      default: return state;
    }
  },

  opponent: (state = null, { type, opponent }) => {
    switch (type) {
      case 'READY': return opponent;
      default: return state;
    }
  },

  info: (state = null, { type, msg }) => {
    switch (type) {
      case 'WAIT':
      case 'READY':
      case 'PARTIAL':
      case 'END': return msg;
      case 'START': return null;
      default: return state;
    }
  },

  virus: (state = null, { type, virus }) => {
    switch (type) {
      case 'SHOW_VIRUS': return virus;
      case 'PARTIAL':
      case 'KILL_VIRUS':
      case 'MISS_VIRUS':
      case 'HIDE_VIRUS': return null;
      default: return state;
    }
  },

  end: (state = false, { type }) => {
    switch (type) {
      case 'WAIT':
      case 'READY': return false;
      case 'END': return true;
      default: return state;
    }
  },

  animated: (state = false, { type }) => {
    switch (type) {
      case 'START': return true;
      case 'STOP': return false;
      default: return state;
    }
  },

  startTime: (state = null, { type }) => {
    switch (type) {
      case 'SHOW_VIRUS': return performance.now();
      default: return state;
    }
  },

  elapsed: (state = null, { type, elapsed }) => {
    switch (type) {
      case 'TIME': return elapsed;
      default: return state;
    }
  },

  interval: (state = null, { type, interval }) => {
    switch (type) {
      case 'SHOW_VIRUS': return interval;
      default: return state;
    }
  },

  hit: (state = false, { type }) => {
    switch (type) {
      case 'KILL_VIRUS': return true;
      case 'START': return false;
      default: return state;
    }
  }
};