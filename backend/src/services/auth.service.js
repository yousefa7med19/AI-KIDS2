const User = require('../models/User');

async function findUserByEmail(email) {
  return await User.findOne({
    email: email.trim().toLowerCase()
  });
}

async function createUser(userData) {
  const user = new User(userData);

  await user.save();

  return user;
}

module.exports = {
  findUserByEmail,
  createUser
};