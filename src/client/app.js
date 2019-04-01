const http = require('http');
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');
const path = require('path');
const { BASE_URL } = require('../lib/AppConstant');

const serve = serveStatic(path.join(__dirname, 'public'), { index: ['index.html'] });

const server = http.createServer((req, res) => {
  serve(req, res, finalhandler(req, res));
});

const PORT = 3001;
server.listen(PORT, () => console.info(`Static server is running at ${BASE_URL}:${PORT}`));
