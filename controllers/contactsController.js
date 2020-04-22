// 1. import modules

// import http-errors
const createError = require("http-errors");

// 2. create contacts array that holds the contacts data
const contacts = [];

// 3. write controllers

// GET controller
exports.getContacts = (req, res) => {
  res.json({ contacts: contacts });
  //   res.send("GET request received on /contacts");
};

// POST controller
exports.postContact = (req, res) => {
  console.log(req.body);
  contacts.push(...req.body);
  res.send("POST request received on /contacts");
};

// PUT controller
exports.putContact = (req, res, next) => {
  console.log(req.params.id);
  if (req.params.id != "1") {
    next(createError(500));
  }
  res.send("PUT request received on /contacts/:id");
};

// DELETE controller
exports.deleteContact = (req, res, next) => {
  console.log(req.params.id);
  if (req.params.id != "1") {
    next(createError(500));
  }
  res.send("DELETE request received on /contacts/:id");
};
