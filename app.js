// 1. import the modules

// import express
const express = require("express");

// create the server
const app = express();

// import http-errors
const createError = require("http-errors");

// 2. import the files

// import index Route
const indexRoute = require("./routes/indexRoute");

// import contacts Route
const contactsRoute = require("./routes/contactsRoute");

// 3. config ports

// tell the web server what port to listen on.
const port = process.env.PORT || 3000;

// 4. convert data

// convert the data received from client to json format
app.use(express.json());

// 5. create Routes

// create index Route
app.use("/", indexRoute);

// create contacts Route
app.use("/contacts", contactsRoute);

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
