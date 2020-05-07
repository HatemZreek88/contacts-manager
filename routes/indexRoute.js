// import express
const Route = require("express").Router();

//import indexController
const { indexController } = require("../controllers/indexController");

// GET Route
Route.get("/", indexController);

//export indexRoute
module.exports = Route;
