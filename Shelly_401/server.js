const http = require('http');
const fs = require('fs');
const superagent = require('superagent');

module.exports = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application:json' });
if(req.method === 'GET' && req.url === '/notes'){
  const notes = require(__dirname + '/notes.json');
  var note = notes.hello;
  res.write(note);
return res.end();
}

if(req.method === 'POST' && req.url === '/notes'){
  req.on('data', (data) => {
    const keep = fs.createWriteStream(__dirname + '/notes.json');
    keep.write(data);
      res.writeHead(200, { 'Content-type': 'text/plain'} );
      var parsed = JSON.parse(data);
      res.write(parsed.hello);
      return res.end();
  });
    return;
}

res.writeHead(404, { 'Content-Type': 'text/plain' });
res.write('404 message received');
return res.end('');
}).listen(3000, ()=> process.stdout.write('server up on 3000'));
