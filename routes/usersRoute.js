// stage - 5

//import express
const Route = require("express").Router();

// import usersController
const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/usersController");

// import validateUsers middleware
const { validateUsers } = require("../middleware/usersValidator");

// usersRoute Methods
Route.get("/", getUsers);

Route.get("/:id", getUser);

Route.post("/", validateUsers(), postUser);

Route.put("/:id", putUser);

Route.delete("/:id", deleteUser);

// export usersRoute
module.exports = Route;
