// import userSchema
const User = require("../models/userSchema");

// import http-errors
const createError = require("http-errors");

// import jsonWebToken
const jwt = require("jsonwebtoken");

//GET users method
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, users: users });
  } catch (err) {
    next(err);
  }
};

//GET user method
exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) throw createError(404);
    res.json({ success: true, user: user });
  } catch (err) {
    next(err);
  }
};

//POST user method
exports.postUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const token = user.generateAuthToken();
    await user.save();
    const data = user.getPublicFields();
    res.header("x-auth", token).json({ success: true, user: data });
  } catch (err) {
    next(err);
  }
};

// PUT user method
exports.putUser = async (req, res, next) => {
  const { id } = req.params;
  const user = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(id, user, { new: true });
    if (!updateUser) throw createError(500);
    res.json({ success: true, user: updateUser });
  } catch (err) {
    next(err);
  }
};

// DELETE user method
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw createError(500);
    }
    res.json({ success: true, user: user });
  } catch (err) {
    next(err);
  }
};

//LOGIN method
exports.login = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    const valid = await user.checkPassword(password);
    if (!valid) throw createError(403);
    let token = user.generateAuthToken();
    const data = user.getPublicFields();
    res.header("x-auth", token).json({ success: true, user: data });
  } catch (err) {
    next(err);
  }
};
