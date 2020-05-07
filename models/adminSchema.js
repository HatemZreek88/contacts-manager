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

// create AdminSchema
const AdminSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true },
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
AdminSchema.methods.generateAuthToken = function () {
  const admin = this;
  const token = jwt.sign({ _id: admin._id }, env.jwt_key).toString();
  admin.tokens.push({ token });
  return token;
};

// filter output for AdminSchema
AdminSchema.methods.getPublicFields = function () {
  let returnObject = {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    _id: this._id,
  };
  return returnObject;
};

// check adminLoginPassword
AdminSchema.methods.checkPassword = async function (password) {
  const admin = this;
  return await compare(password, admin.password);
};

AdminSchema.pre("save", async function (next) {
  this.password = await encrypt(this.password);
  next();
});

// create encryptedPassword
AdminSchema.statics.findByToken = function (token) {
  const Admin = this;
  let decoded;
  try {
    decoded = jwt.verify(token, env.jwt_key);
  } catch (err) {
    return "";
  }
  return Admin.findOne({
    _id: decoded._id,
  }).select("-password -__v");
};

//plugin uniqueValidator
AdminSchema.plugin(uniqueValidator);

// export AdminSchema
module.exports = mongoose.model("Admin", AdminSchema);
