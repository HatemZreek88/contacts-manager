//t2
const db = require("../models/db.js");

const createError = require("http-errors");

//t3

// import userschema to connect this controller to database
const User = require("../models/userSchema");

//t3

// make every method async
exports.getUsers = async (req, res, next) => {
  // let users = db.get("users").value();

  // use try and catch for every method
  try {
    // to find all users use find ()
    const users = await User.find();
    res.json({ success: true, users: users });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  // let user = db.get("users").find({ id }).value();
  try {
    // to find a user use findById ()
    const user = await User.findById(id);
    if (!user) throw createError(404);
    res.json({ success: true, user: user });
  } catch (err) {
    next(err);
  }
};
exports.postUser = async (req, res, next) => {
  // we want to see the body for the post
  // console.log(req.body);
  // let users = db
  //   .get("users")
  //   .push(req.body)
  //   .last()
  //   .assign({ id: new Date().getTime().toString() })
  //   .write();
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true, user: user });
  } catch (err) {
    next(err);
  }
};

exports.putUser = (req, res, next) => {
  const { id } = req.params;
  const user = req.body;
  user.id = new Date().getTime().toString();
  db.get("users").find({ id }).assign(user).write();
  res.json({ success: true, user: user });
};

exports.deleteUser = (req, res, next) => {
  console.log(req.params.id);

  //everywhere we need error type the if and next 500
  if (req.params.id != "1") {
    next(createError(500));
  }
  const { id } = req.params;
  let user = db.get("users").remove({ id }).write();
  res.json({ success: true, user: user });
};
// need comments
