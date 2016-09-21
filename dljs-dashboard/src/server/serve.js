// TODO: get a real production server
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const baseConfig = require('./webpack.config');

const baseParams = {
  hot: true,
  contentBase: path.join(__dirname, '../client'),
  publicPath: baseConfig.output.publicPath,
  historyApiFallback: true,
  quiet: true,
  // stats: { colors: true },
};

module.exports = function serve({ host, port, socketPort }) {
  const params = Object.assign({}, baseParams); // TODO: verbose and other options
  const config = Object.assign({}, baseConfig);

  config.plugins = config.plugins.slice();
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.socketUrl': JSON.stringify(`http://${host}:${socketPort}`),
  }));

  const compiler = webpack(config);

  const compilerPromise = new Promise(resolve => compiler.plugin('done', resolve));

  const serverPromise = new Promise((resolve, reject) => {
    new WebpackDevServer(compiler, params).listen(port, host, err => {
      if (err) return reject(err);

      console.log(`dljs-dashbord at http://localhost:${port}/`);

      resolve();
    });
  });

  return Promise.all([compilerPromise, serverPromise]);
};
