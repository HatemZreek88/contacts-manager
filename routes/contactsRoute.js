// 1. import Routes

// import contacts Route
const Route = require("express").Router();

// 2. import controllers

//import contacts Controllers
const {
  getContacts,
  postContact,
  putContact,
  deleteContact,
} = require("../controllers/contactsController");

// 3. requests management

// create GET request for contacts Route
Route.get("/", getContacts);

// create POST request for contacts Route
Route.post("/", postContact);

// create PUT request for contacts Route
Route.put("/:id", putContact);

// create DELETE request for contacts Route
Route.delete("/:id", deleteContact);

// 4. export Routes

// export contacts Route
module.exports = Route;
