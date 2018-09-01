const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

mongoose.connect('mongodb://localhost/suggestions', { useNewUrlParser: true });

/***** SCHEMAS ****************************************/
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  savedItems: Array,
});

// const saveItemSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   items: Array,
// });

/***** MODELS ****************************************/
const UserModel = mongoose.model('Users', userSchema);
// const SaveItemModel = mongoose.model('SaveItem', saveItemSchema);

/***** user functions ****************************************/
// All db functions should return promises
// userData = { email, password}
const saveUser = (userData) => {
  // save user
  return new Promise((resolve, reject) => {
    const newUser = new UserModel(userData);
    newUser.save((err, savedUser) => {
      if (err) {
        // check if email already taken
        if (err.code === 11000) {
          reject('email taken');
        } else {
          reject(err);
        }
      } else {
        resolve(savedUser);
      }
    });
  });
};

const getUser = ({ email, password }) => {
  // get user
  console.log('from get user', email, password)
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email }, (err, results) => {
      if (err) reject(err);

      // check if not found
      if (!results) {
        reject('invalid');
      } else {
        // check if password matches
        if (results.password !== password) {
          reject('invalid');
        }
        // correct password / email
        resolve('success');
      }
    });
  });
};
// saveUser({ email: 'ken@ken.com', password: '123 '})
// .then(user => console.log('success!'))
// .catch(err => console.log(err));

const saveItem = ({ email, item }) => {
  console.log('SAVING', email, item);
  // item should be object holding category and item data
  return new Promise((resolve, reject) => {
    UserModel.updateOne({ email: email }, { $push: { savedItems: item } }, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve('I AM RESULTS', results);
    });
  });
};

const getSavedItems = ({ email }) => {
  console.log('getSavedItemsEmail', email);
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email }, (err, results) => {
      if (err) reject(err);

      resolve(results);
    });
  });
};

module.exports = {
  saveUser,
  getUser,
  saveItem,
  getSavedItems
};