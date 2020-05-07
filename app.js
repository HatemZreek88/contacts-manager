// import express
const express = require("express");

// create the server
const app = express();

// import mongoose
const mongoose = require("mongoose");

// import http-errors
const createError = require("http-errors");

// import morgan
const logger = require("morgan");

// import config file
const env = require("./config/config");

// import index Route
const indexRoute = require("./routes/indexRoute");

// import contacts Route
const contactsRoute = require("./routes/contactsRoute");

// import user Route
const usersRoute = require("./routes/usersRoute");

// import admin Route
const adminsRoute = require("./routes/adminsRoute");

// import setCors middle-ware
const { setCors } = require("./middleware/security");

// config ports
const port = process.env.PORT || 3000;

// connect the app.js to the database
mongoose.connect(env.db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.on("open", () => console.log("database is connected "));

// convert  the received data to JSON
app.use(express.json());

// use morgan middleware
app.use(logger("dev"));

// use setCors middleware
app.use(setCors);

// create index Route
app.use("/", indexRoute);

// create contacts Route
app.use("/contacts", contactsRoute);

// create users Route
app.use("/users", usersRoute);

// create admins Route
app.use("/admins", adminsRoute);

// create error handler
app.use((req, res, next) => {
  next(createError(404));
});

// create error catcher
app.use((err, req, res, next) => {
  res.json({ status: err.status, err: err.message });
});

// listen to the port
app.listen(port, () => console.log("server is running"));
