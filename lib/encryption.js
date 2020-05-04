// stage - 7

// import bcrypt
const bcrypt = require("bcrypt");

// encrypt userPassword for singUP
exports.encrypt = async (password) => {
  if (!password) return "";
  return await bcrypt.hash(password, 10);
};

// compare userPassword and encryptedPassword for logIn
exports.compare = async (password, hash) => {
  // compare the password from user with the password in database
  return await bcrypt.compare(password, hash);
};
