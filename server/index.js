const express = require('express');
const cors = require('cors');
const router = require('./routes');
const { PORT } = require('./configs');

const app = express();

const corsConfig = {
  origin: 'http://localhost:4200',
  credentials: true,
};

app.use(cors(corsConfig));

app.use(express.json());
app.use(router);
app.use(express.static('public'));

app.listen(PORT, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`); // eslint-disable-line no-console
  } else {
    console.log(`🚀 Server is listening on port ${PORT}!`); // eslint-disable-line no-console
  }
});
