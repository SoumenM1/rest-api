const mongoose = require('mongoose');
exports.mongodb = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/demo');
    console.log('Mongo connected seamlessly');
  } catch (error) {
    console.log('Mongo connection unsuccessful: ', error);
  }
};

