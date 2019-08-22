const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/Golang', {
    // target: 'https://w3.jans.xin/',
    target: 'http://jansora.com:8080/',
    // target: 'http://localhost:8080/',
    changeOrigin: true,
    pathRewrite: {
      //'^/api/': '/', // rewrite path
    },

  }));
};


