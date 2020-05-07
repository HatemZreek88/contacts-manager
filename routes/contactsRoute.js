//import express
const Route = require("express").Router();

//import contacts Controllers
const {
  getContacts,
  getContact,
  postContact,
  putContact,
  deleteContact,
} = require("../controllers/contactsController");

// import authenticator
const { auth } = require("../middleware/authenticator");

// import validateInputs middleware
const { validateContacts } = require("../middleware/contactsValidator");

// GET Routes
Route.get("/", auth, getContacts);
Route.get("/:id", getContact);

// POST Route
Route.post("/", validateContacts(), postContact);

// PUT Route
Route.put("/:id", putContact);

// DELETE Route
Route.delete("/:id", deleteContact);

// export contacts Route
module.exports = Route;
