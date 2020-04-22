//t2
const db = require("../models/db.js");

const createError = require("http-errors");
//t2
exports.getContacts = (req, res, next) => {
  let contacts = db.get("contacts").value();
  res.json({ success: true, contacts: contacts });
};
// t2
exports.getContact = (req, res, next) => {
  const { id } = req.params;
  let contact = db.get("contacts").find({ id }).value();
  res.json({ success: true, contact: contact });
};
exports.postContact = (req, res, next) => {
  // we want to see the body for the post
  console.log(req.body);
  let contacts = db
    .get("contacts")
    .push(req.body)
    .last()
    .assign({ id: new Date().getTime().toString() })
    .write();
  res.json({ success: true, contact: req.body });
};

exports.putContact = (req, res, next) => {
  const { id } = req.params;
  const contact = req.body;
  contact.id = new Date().getTime().toString();
  db.get("contacts").find({ id }).assign(contact).write();
  res.json({ success: true, contact: contact });
};

exports.deleteContact = (req, res, next) => {
  console.log(req.params.id);

  //everywhere we need error type the if and next 500
  if (req.params.id != "1") {
    next(createError(500));
  }
  const { id } = req.params;
  let contact = db.get("contacts").remove({ id }).write();
  res.json({ success: true, contact: contact });
};
