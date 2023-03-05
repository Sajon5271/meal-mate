const express = require('express');
const cors = require('cors');
const fileUploadUtil = require('express-fileupload');
const { join } = require('path');
const router = require('./routes');
const http = require('http');
const { PORT } = require('./configs');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const corsConfig = {
  origin: 'http://localhost:4200',
  credentials: true,
};

io.on('connection', (socket) => {
  console.log('A request Came through');
});

app.use(cors(corsConfig));

app.use(express.json());
app.use(
  fileUploadUtil({
    limits: {
      fileSize: 10000000, // Around 10MB
    },
    abortOnLimit: true,
  })
);
app.use(router);
app.use(express.static(join(__dirname + '/public')));

server.listen(PORT, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`🚀 Server is listening on port ${PORT}!`);
  }
});
