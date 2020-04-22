//t2
const db = require("../models/db.js");

const createError = require("http-errors");
//t2
exports.getUsers = (req, res, next) => {
  let users = db.get("users").value();
  res.json({ success: true, users: users });
};
// t2
exports.getUser = (req, res, next) => {
  const { id } = req.params;
  let user = db.get("users").find({ id }).value();
  res.json({ success: true, user: user });
};
exports.postUser = (req, res, next) => {
  // we want to see the body for the post
  console.log(req.body);
  let users = db
    .get("users")
    .push(req.body)
    .last()
    .assign({ id: new Date().getTime().toString() })
    .write();
  res.json({ success: true, user: req.body });
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
