// Stage - 5

// import indexRoute
const Route = require("express").Router();

//import indexController
const { indexController } = require("../controllers/indexController");

// indexRoute Methods
Route.get("/", indexController);

//export indexRoute
module.exports = Route;
