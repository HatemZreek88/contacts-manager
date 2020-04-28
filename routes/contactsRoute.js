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

// import validateInputs middleware
const { validateContacts } = require("../middleware/contactsValidator");

// 3. requests management

// create GET request for contacts Route
Route.get("/", getContacts);
Route.get("/:id", getContact);

// create POST request for contacts Route
Route.post("/", validateContacts(), postContact);

// create PUT request for contacts Route
Route.put("/:id", putContact);

// create DELETE request for contacts Route
Route.delete("/:id", deleteContact);

// 4. export Routes

// export contacts Route
module.exports = Route;
