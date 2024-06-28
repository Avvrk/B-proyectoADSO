const net = require('net');

function findAvailablePort(startPort = 3000) {
  return new Promise((resolve, reject) => {
    let port = startPort;
    const server = net.createServer();

    server.listen(port, () => {
      server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          // Port is in use, try the next one
          findAvailablePort(port + 1).then(resolve);
        } else {
          reject(err);
        }
      });

      server.close(() => {
        resolve(port);
      });
    });
  });
}

findAvailablePort().then((port) => {
  console.log(`Available port: ${port}`);
}).catch((err) => {
  console.error(err);
});