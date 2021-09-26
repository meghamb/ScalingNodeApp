const cpu_count = require('os').cpus().length;
// console.log(cpu_count);
const http = require('http');

/* this cluster helped us to clone multiple clones of process */
const cluster = require('cluster');

/* app.js is worker process, index.js which does spawing of wokrer processes is valled master process */
if (cluster.isMaster) {
  console.log(' this is a  master process', process.pid);
  for (let i = 0; i < cpu_count; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`worker process died ${worker.pid}`);
    console.log(`workers left ${Object.keys(cluster.workers).length}`);
    cluster.fork();
  });
  //   cluster.fork();
  //   cluster.fork();
} else {
  console.log('this is a worker/child process', process.pid);
  http
    .createServer((req, res) => {
      const message = `worker ${process.pid}`;
      res.end(`worker ${process.pid}`);
      if (req.url == '/kill') {
        process.exit();
      } else {
        console.log(message);
      }
    })
    .listen(3000);
}
/*  zero downtime => a process will always be up
    main process=> app servers 
    you can directly use pm2 for managing these clusters like pm2 start app.js -i 4
    use 'loadtest' to concurrently run 300-3000 processes
    */
