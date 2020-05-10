const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
require('./config/config');

const app = express();
let server = http.createServer( app );

const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

module.exports = io = socketIO( server );
require('./sockets/socket');

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);

});