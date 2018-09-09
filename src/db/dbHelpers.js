const models = require('./models');
const { UserModel, GoogleModel } = models;

const saveUser = (userData) => {
  // save user
  return new Promise((resolve, reject) => {
    const newUser = new UserModel(userData);
    newUser.save((err, savedUser) => {
      if (err) {
        // check if email already taken
        if (err.code === 11000) {
          reject('invalid');
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
        resolve(results);
      }
    });
  });
};

const findOrCreateGoogleUser = (googleId) => {
  return new Promise((resolve, reject) => {
    GoogleModel.findOne({ googleId }, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        // found user, so resolve
        if (result) {
          resolve({
            googleUser: result,
            created: false,
          });
        } else {
          // not found, so create
          GoogleModel.create({ googleId }, (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve({
              googleUser: result,
              created: true,
            });
          });
        }
      }
    });
  });
};

const findGoogleUserById = (id) => {
  return new Promise((resolve, reject) => {
    GoogleModel.findById(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    UserModel.findById(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// save item from a search
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

// retrieve all user saved items
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
  getSavedItems,
  findOrCreateGoogleUser,
  findGoogleUserById,
  findUserById,
};