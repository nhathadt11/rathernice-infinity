const http = require('http');
const { quote } = require('./service');
const { BASE_URL } = require('../lib/AppConstant');

const cors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
  }
};

const requestHandler = (req, res) => {
  // Set CORS headers
  cors(req, res);

  if (req.url === '/event-stream') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive', //eslint-disable-line
    });

    const taskId = setInterval(() => {
      quote.random(q => res.write(`data: ${q} \n\n`));
    }, 5000);

    req.on('close', () => clearInterval(taskId));
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache',
    });
    res.end('Page not found');
  }
};

const server = http.createServer(requestHandler);

// Start server
const PORT = 3000;
server.listen(PORT, () => console.info(`Server is running at ${BASE_URL}:${PORT}`));
