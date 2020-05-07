// import bcrypt
const bcrypt = require("bcrypt");

// encrypt password for singUP
exports.encrypt = async (password) => {
  if (!password) return "";
  return await bcrypt.hash(password, 10);
};

// compare currentPassword and encryptedPassword for logIn
exports.compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
