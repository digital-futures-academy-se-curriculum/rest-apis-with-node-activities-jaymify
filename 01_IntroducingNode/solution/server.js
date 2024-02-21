const http = require('http');

const PORT = 4000;
const HOST = `localhost`;

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello World\n`);
    console.log(`Server at http://${HOST}:${PORT}`);
}).listen(PORT, HOST);



