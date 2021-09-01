const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 5005;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));