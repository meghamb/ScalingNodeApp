const http = require('http');
const port = parseInt(process.argv[2]) | 3000;

const server = http.createServer((req, res) => {
  res.end('OK');
});
server.listen(port);
console.log(`server listening to port ${port} `);
