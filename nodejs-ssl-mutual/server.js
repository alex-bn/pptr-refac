const fs = require('fs');
const https = require('https');

const options = {
  key: fs.readFileSync(`${__dirname}/certs/server-key.pem`),
  cert: fs.readFileSync(`${__dirname}/certs/server-crt.pem`),
  ca: [fs.readFileSync(`${__dirname}/certs/client-ca-crt.pem`)],
  // requesting the client to provide a certificate for auth
  requestCert: true,
  // enforce no unauthenticated traffic
  rejectUnauthorized: true,
};

const port = 8888;

https
  .createServer(options, function (req, res) {
    console.log(
      new Date() +
        ' ' +
        req.socket.remoteAddress +
        ' ' +
        req.method +
        ' ' +
        req.url
    );
    res.writeHead(200);
    res.end('OK!\n');
  })
  .listen(port, () => {
    console.log(`https listening on port ${port}`);
  });
