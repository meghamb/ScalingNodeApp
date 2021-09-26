const http = require('http');
const { LocalStorage } = require('node-localstorage');

const db = new LocalStorage('./data');
const server = http
  .createServer((req, res) => {
    if (req.url === '/') {
      let requests = db.getItem('requests');
      db.setItem('requests', ++requests);
      console.log(`${process.pid} ${requests}`);
      res.end(JSON.stringify(requests));
    }
  })
  .listen(3000);

console.log('counting requests on server');
/* if we have multiple instances of sam e server running we need to have a single storage to look up data , like localstorage in this example */
