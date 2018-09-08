const findOrCreate = require('mongoose-findorcreate');
const Schema = require('./db').Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  savedItems: Array,
});

const googleSchema = new Schema({
  googleId: {
    type: String,
    unique: true,
  }
  // googleToken: String,
  // googleName: String,
  // googleEmail: String,
});

googleSchema.plugin(findOrCreate);

module.exports = {
  userSchema,
  googleSchema,
}