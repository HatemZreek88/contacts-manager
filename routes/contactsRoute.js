// stage - 5

// import contactsRoute
const Route = require("express").Router();

// 2. import controllers

//import contacts Controllers
const {
  getContacts,
  getContact,
  postContact,
  putContact,
  deleteContact,
} = require("../controllers/contactsController");

// import authenticator
const auth = require("../middleware/authenticator");

// import rolesAuthenticator
const isAdmin = require("../middleware/rolesAuthenticator");

// import validateInputs middleware
const { validateContacts } = require("../middleware/contactsValidator");

// 3. requests management

// create GET request for contacts Route
Route.get("/", auth, isAdmin, getContacts);
Route.get("/:id", auth, getContact);

// create POST request for contacts Route
Route.post("/", validateContacts(), auth, isAdmin, postContact);

// create PUT request for contacts Route
Route.put("/:id", auth, isAdmin, putContact);

// create DELETE request for contacts Route
Route.delete("/:id", auth, isAdmin, deleteContact);

// 4. export Routes

// export contacts Route
module.exports = Route;
