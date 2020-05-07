//import express
const Route = require("express").Router();

// import usersController
const {
  getUsers,
  getUser,
  postUser,
  login,
  putUser,
  deleteUser,
} = require("../controllers/usersController");

// import authenticator
const { auth } = require("../middleware/authenticator");

// import validateInputs middleware
const { validateInputs } = require("../middleware/validateInputs");

// GET Routes
Route.get("/", auth, getUsers);
Route.get("/:id", getUser);

// POST Route
Route.post("/", validateInputs(), postUser);

// LOGIN Route
Route.post("/login", login);

// PUT Route
Route.put("/:id", putUser);

// DELETE Route
Route.delete("/:id", deleteUser);

// export usersRoute
module.exports = Route;
