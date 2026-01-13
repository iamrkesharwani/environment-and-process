const http = require('http');

// 1. Mock Database Object
const db = {
  close: (callback) => {
    console.log('Closing database connection...');
    setTimeout(() => {
      console.log('Database connection closed.');
      callback();
    }, 2000);
  },
};

// 2. HTTP Server with a 10-second delay for processing
const server = http.createServer((req, res) => {
  console.log('Received new request, it will take 10 seconds...');

  setTimeout(() => {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      Connection: 'close',
    });
    res.end('Work done! Closing server...');
    console.log('Request done');
  }, 10000);
});

// 3. Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// 4. Graceful Shutdown Function
function shutdown(signal) {
  console.log(`Received ${signal}. Rejecting new requests.`);
  console.log('Initiating graceful shutdown...');

  // STEP 1: Stop accepting new connections
  server.close(() => {
    console.log('Server closed successfully');

    // STEP 2: Close database connection after server is stopped
    db.close(() => {
      console.log('Graceful shutdown complete.');

      // STEP 3: Exit the process
      process.exit(0);
    });
  });

  // Emergency exit
  setTimeout(() => {
    console.log('Shutdown timed out. Closing forcefully.');
    process.exit(1);
  }, 15000);
}

// 5. Listening for system signals
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
