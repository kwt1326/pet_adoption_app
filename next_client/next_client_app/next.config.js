const webpack = require('webpack');
const _redirects = require('./redirects');

const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config) => {
    // 기존의 웹팩 플러그인에 새로운 Dotenv플러그인을 연결시켜준다.
    // silent는 옵션은 .env파일을 찾지 못했을 때 에러를 일으키지 않도록 설정해주는 옵션이다.
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  }
};

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
    // .env 파일을 root 에 생성해주어야 합니다!
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
  async redirects() { return _redirects },
}
