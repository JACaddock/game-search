const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
    app.use(
        '/games',
        createProxyMiddleware({
            target: 'https://api.igdb.com/v4',
            changeOrigin: true,
        })
    );
};