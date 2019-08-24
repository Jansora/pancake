const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(proxy('/Golang', {
    target: 'http://jansora.com:8080/',
    changeOrigin: true,
  }));
};
