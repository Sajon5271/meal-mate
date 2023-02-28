const mongoose = require('mongoose');
const { DB_URL } = require('./configs');

(async function () {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`🦆 Database connected`); // eslint-disable-line no-console
  } catch (error) {
    console.log(`😞 Sorry, something went wrong! ${error}`); // eslint-disable-line no-console
  }
})();

module.exports = mongoose;
