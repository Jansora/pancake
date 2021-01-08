const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(proxy('/api', {
    target: 'http://localhost:51001/',
    // target: 'http://jansora.com:9008/',
    // target: 'https://jansora.com/',
    changeOrigin: true,
  }));
};
