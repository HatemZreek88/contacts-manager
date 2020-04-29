//stage 6

// import userSchema
const User = require("../models/userSchema");

// import http-errors
const createError = require("http-errors");

//requests functions
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, users: users });
  } catch (err) {
    next(err);
  }
};

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

exports.postUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true, user: user });
  } catch (err) {
    next(err);
  }
};

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

// create the login inside usersController
exports.login = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName, password });
    if (!user) throw createError(404);
    res.header("test", "123");
    res.json({ success: true, message: `${user.userName} welcome` });
  } catch (err) {
    next(err);
  }
};
