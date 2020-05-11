//import express
const Route = require("express").Router();

// import adminsController
const {
  getAdmins,
  getAdmin,
  postAdmin,
  login,
  putAdmin,
  deleteAdmin,
} = require("../controllers/adminsController");

// import authenticator
const { auth } = require("../middleware/authenticator");

// import validateInputs middleware
const { validateInputs } = require("../middleware/validateInputs");

// GET Routes
Route.get("/", auth, getAdmins);
Route.get("/:id", auth, getAdmin);

// POST Route
Route.post("/", validateInputs(), auth, postAdmin);

// LOGIN Route
Route.post("/login", login);

// PUT Route
Route.put("/:id", auth, putAdmin);

// DELETE Route
Route.delete("/:id", auth, deleteAdmin);

// export usersRoute
module.exports = Route;
