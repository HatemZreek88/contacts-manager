// 1. import Routes

// import index Route
const Route = require("express").Router();

// 2. import controllers

//import index Controller
const { indexController } = require("../controllers/indexController");

// 3. requests management

// create GET request for index Route
Route.get("/", indexController);

// 4. export Routes

// export index Route
module.exports = Route;
