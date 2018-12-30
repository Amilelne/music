const { configure } = require('./config');
const mongoose = require('mongoose');

// configure
const { mongodb } = configure;
for (const key of Object.keys(mongodb)) {
  mongoose.set(key, mongodb[key]);
}

// plugins

// event
mongoose.connection.on('open', () => {
  console.log(`Connected to MongoDB`);
});

mongoose.connection.on('error', () => {
  console.log(`Failed to connect MongoDB`);
  // do something else
  process.exit(-1);
});

module.exports = mongoose;
