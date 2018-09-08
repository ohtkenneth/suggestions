const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = mongoose.ObjectId;

const db = mongoose.connect('mongodb://localhost/suggestions', { useNewUrlParser: true });

module.exports = {
  mongoose,
  Schema,
};