import tls from 'tls';
import fs from 'fs';

const msg = [
  '.-..-..-.  .-.   .-. .--. .---. .-.   .---. .-.',
  ': :; :: :  : :.-.: :: ,. :: .; :: :   : .  :: :',
  ":    :: :  : :: :: :: :: ::   .': :   : :: :: :",
  ": :: :: :  : `' `' ;: :; :: :.`.: :__ : :; ::_;",
  ":_;:_;:_;   `.,`.,' `.__.':_;:_;:___.':___.':_;",
].join('\n');

const options = {
  key: fs.readFileSync('./server-key.pem'),
  cert: fs.readFileSync('./server-crt.pem'),
  ca: [fs.readFileSync('./client-ca-crt.pem')],
};

tls
  .createServer(options, function (s) {
    s.write(msg + '\n');
    s.pipe(s);
  })
  .listen(8000, () => {
    console.log('Server running on port 8000');
  });
