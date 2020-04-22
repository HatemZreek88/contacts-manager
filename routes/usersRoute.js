const Route = require("express").Router();
const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/usersController");

// second route Users
Route.get("/", getUsers);
// t2 ---> to get User from lowdb
Route.get("/:id", getUser);
// we can see posts on postman not on browser, browser only for see get requests
// we used post request here to add new Users
Route.post("/", postUser);
// we use put to update the Users so we need the ids and :id is a parm
// you need to update the body in postman to add something and to see the results we need 2 console logs
Route.put("/:id", putUser);
// delete route
Route.delete("/:id", deleteUser);
module.exports = Route;
// need comments
