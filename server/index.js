const express = require('express');
const cors = require('cors');
const fileUploadUtil = require('express-fileupload');

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
app.use(express.static('public'));
app.use(router);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`🚀 Server is listening on port ${PORT}!`);
  }
});

