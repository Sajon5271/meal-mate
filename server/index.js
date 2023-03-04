const express = require('express');
const cors = require('cors');
const fileUploadUtil = require('express-fileupload');
const { join } = require('path');
const router = require('./routes');
const { PORT } = require('./configs');

const app = express();

const corsConfig = {
  origin: 'http://localhost:4200',
  credentials: true,
};

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

app.listen(PORT, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`🚀 Server is listening on port ${PORT}!`);
  }
});
