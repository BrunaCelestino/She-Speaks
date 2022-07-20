/* eslint-disable no-console */
const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('database connected');
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connect };
