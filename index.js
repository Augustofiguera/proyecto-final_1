const app = require('./app');
const http = require('http');
const { PAGE_URL } = require('./config');

const server = http.createServer(app);

server.listen(3003, () => {
    console.log('el servidor esta corriendo');
}) 