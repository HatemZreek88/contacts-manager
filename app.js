// stage - 5

// 1. import the modules

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

// 2. import the files

// import index Route
const indexRoute = require("./routes/indexRoute");

// import contacts Route
const contactsRoute = require("./routes/contactsRoute");

// import user Route
const usersRoute = require("./routes/usersRoute");

// import setCors middle-ware
const { setCors } = require("./middleware/security");

// 3. config ports

// tell the web server what port to listen on.
const port = process.env.PORT || 3000;

// connect the app.js to the database like seed.js
mongoose.connect("mongodb://127.0.0.1:27017/my-database", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.on("open", () => console.log("database is connected "));

// 4. convert data

// convert the data received from client to json format
app.use(express.json());

// use morgan middleware
app.use(logger("dev"));

// use setCors middleware
app.use(setCors);

// 5. create Routes

// create index Route
app.use("/", indexRoute);

// create contacts Route
app.use("/contacts", contactsRoute);

// create users Route
app.use("/users", usersRoute);

// 6. errors management

// create error handler
app.use((req, res, next) => {
  next(createError(404));
});

// create error catcher
app.use((err, req, res, next) => {
  res.json({ status: err.status, err: err.message });
});

// 3. config ports

// listen to the port
app.listen(port, () => console.log("server is running"));
