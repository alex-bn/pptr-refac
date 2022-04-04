import tls from 'tls';
import fs from 'fs';

const options = {
  key: fs.readFileSync('./client-key.pem'),
  cert: fs.readFileSync('./client-crt.pem'),
  ca: [fs.readFileSync(`./server-ca-crt.pem`)],
};

const conn = tls.connect(8000, options, function () {
  if (conn.authorized) {
    console.log('Connection authorized by a CA');
  } else {
    console.log('Connection not authorized' + conn.authorizationError);
  }
});

conn.on('data', function (data) {
  console.log(data.toString());
  conn.end();
});
