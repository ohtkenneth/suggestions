const mongoose = require('mongoose');
const schemas = require('./schemas');

const UserModel = mongoose.model('Users', schemas.userSchema);
const GoogleModel = mongoose.model('GoogleUsers', schemas.googleSchema);

module.exports = {
  UserModel,
  GoogleModel,
}