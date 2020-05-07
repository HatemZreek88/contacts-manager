// import mongoose
const mongoose = require("mongoose");

//import uniqueValidator
const uniqueValidator = require("mongoose-unique-validator");

// import jsonWebToken
const jwt = require("jsonwebtoken");

// destructure encrypt and compare
const { encrypt, compare } = require("../lib/encryption");

// import config file
const env = require("../config/config");

// destructure Schema
const { Schema } = mongoose;

// create UserSchema
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  password: { type: String, required: true },
});

// generate tokens
UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, env.jwt_key).toString();
  user.tokens.push({ token });
  return token;
};

// filter output for UserSchema
UserSchema.methods.getPublicFields = function () {
  let returnObject = {
    firstName: this.firstName,
    lastName: this.lastName,
    userName: this.userName,
    email: this.email,
    _id: this._id,
  };
  return returnObject;
};

// check userLoginPassword
UserSchema.methods.checkPassword = async function (password) {
  const user = this;
  return await compare(password, user.password);
};

// create encryptedPassword
UserSchema.pre("save", async function (next) {
  this.password = await encrypt(this.password);
  next();
});

// find users by token
UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, env.jwt_key);
  } catch (err) {}
  return User.findOne({
    _id: decoded._id,
  }).select("-password -__v");
};

//plugin uniqueValidator
UserSchema.plugin(uniqueValidator);

// export UserSchema
module.exports = mongoose.model("User", UserSchema);
