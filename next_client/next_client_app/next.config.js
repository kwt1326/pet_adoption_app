const webpack = require('webpack');
const _redirects = require('./redirects');

module.exports = {
  reactStrictMode: true,
  webpack: (config, _options) => {
    config.plugins.push(new webpack.IgnorePlugin({
      resourceRegExp: /\.test.(js|ts|tsx)$/,
    }));
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.JWT_KEY': JSON.stringify('with-pet-jwt'),
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.NEXT_IS_SERVER': JSON.stringify(
        _options.isServer.toString()
      ),
    }));

    return config;
  },
  async redirects() { return _redirects },
}
