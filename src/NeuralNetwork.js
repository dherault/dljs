/*
  NeuralNetwork
*/

class NeuralNetwork {
  constructor() {
    // Storage is a flat Map-like object, plugins should namespace their keys
    this.storage = new Map();

    // Availlable events
    this.events = {
      _keys: [
        'onBeforeTrain', 'onAfterTrain',
        'onBeforeRun', 'onAfterRun',
        // more to come
      ],
    };

    // this.registerEvents(); // Should be called by child
  }

  registerEvents() {
    this.events._keys.forEach(key => {
      const listenersKey = `${key}Listeners`;

      // Listeners for a given event are stored in an array
      const listeners = this.events[listenersKey] = this.events[listenersKey] || [];

      // An event triggers every listener in its listeners array
      this.events[key] = (...args) => listeners.forEach(l => typeof l === 'function' ? l(...args) : 0);
    });
  }

  addEventListener(event, listener) {
    if (typeof listener !== 'function') throw new Error(`Expected listener to be a function, got ${typeof listener} instead`);
    if (!this.events._keys.includes(event)) throw new Error('Expected event to be one of ${this.events._keys}, got ${event} instead');

    const listenersKey = `${event}Listeners`;
    const index = this.events[listenersKey].push(listener) - 1;

    // We return the unsubscribe function
    return () => this.events[listenersKey][index] = null;
  }
}

module.exports = NeuralNetwork;
