process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');

// Is the file being executed in Master Node ?
if (cluster.isMaster) {
    // Cause index.js to be executed again but in Child Mode
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();

    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.id + ' is online');
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log('Worker ' + worker.id + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });

} else {
    // I'm a child, I'm going to act as a server & do nothing else
    const express = require('express');
    const app = express();
    const { pbkdf2 } = require('crypto');


    app.get('/', (req, res) => {
        console.log('SLOW');
        console.log('WorkerID:', cluster.worker.id, '\nProcessID:', cluster.worker.process.pid);
        console.log('----------------------------------------------------------------------');
        pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            console.log('Hash: ', Date.now() - start);
            res.send('Hi there!---Done Hashing');
        });
    });

    app.get('/fast', (req, res) => {
        console.log('FAST');
        console.log('WorkerID:', cluster.worker.id, '\nProcessID:', cluster.worker.process.pid);
        console.log('************************************************************************');
        res.send('This was fast!');
    });

    app.listen(4500);
}
