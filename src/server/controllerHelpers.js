const dbHelpers = require('../db/dbHelpers');

async function validateUser({ email, password }) {
  try {
    const result = await dbHelpers.getUser({ email, password});
    return result;
  } catch(err) {
    if (err === 'invalid') {
      // wrong email or password
      return 'invalid';
    }
    console.log(err);
  };
};

async function signUpUser({ email, password }) {
  try {
    const result = await dbHelpers.saveUser({ email, password});
    return result;
  } catch(err) {
    if (err === 'invalid') {
      return err;
    }
    console.log(err);
  };
};

module.exports = {
  validateUser,
  signUpUser,
};