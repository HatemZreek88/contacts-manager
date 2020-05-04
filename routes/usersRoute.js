// stage - 6

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
const auth = require("../middleware/authenticator");

// import rolesAuthenticator
const isAdmin = require("../middleware/rolesAuthenticator");

// import validateUsers middleware
const { validateUsers } = require("../middleware/usersValidator");

// usersRoute Methods
Route.get("/", auth, isAdmin, getUsers);

Route.get("/:id", auth, getUser);

Route.post("/", validateUsers(), postUser);

Route.post("/login", login);

Route.put("/:id", auth, putUser);

Route.delete("/:id", auth, deleteUser);

// export usersRoute
module.exports = Route;
