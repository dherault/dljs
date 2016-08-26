class Plugin {
  constructor({ name } = {}) {
    if (typeof name !== 'string') throw new Error(`Invalid plugin name: "${name}"`);

    this.name = name;
  }

  plug(nn) { // TODO: rename
    this.nn = nn;
  }
}

module.exports = Plugin;
