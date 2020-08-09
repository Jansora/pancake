const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(proxy('/v2', {
    target: 'http://localhost:8080/',
    // target: 'http://jansora.com:9003/',
    // target: 'https://jansora.com/',
    changeOrigin: true,
  }));
};
