const express = require('express');
const cors = require('cors');
const fileUploadUtil = require('express-fileupload');
const { join } = require('path');
const router = require('./routes');
const http = require('http');
const { PORT } = require('./configs');
const { Server } = require('socket.io');
const schedule = require('node-schedule');
const { scheduleAllTasks } = require('./utils/scheduler');

const corsConfig = {
  origin: ['http://localhost:4200', 'http://localhost:8080'],
  credentials: true,
};
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsConfig,
});

io.on('connection', (socket) => {
  console.log('A request Came through');
});

//Scheduling saving user data every hour
schedule.scheduleJob('00 * * * *', () => {
  io.emit('saveTodaysData');
  console.log('Sent req');
});

//Scheduling sending notification
scheduleAllTasks();

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
