// stage -5

// we will test the database
// we will connecting this file to the mongo data base

// import mongo
const mongoose = require("mongoose");

// import schema
const User = require("../models/userSchema");

// import faker
const faker = require("faker");

// connect this file to database

// the connection process should be async
// clear the database by try and catch before connection
const main = async () => {
  // add to the connect method  the address of mongo from terminal
  // give the database a name
  // add 2 properties and set them to true
  mongoose.connect("mongodb://127.0.0.1:27017/my-database", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  // check the file if it is connected to database by on method
  mongoose.connection.on("error", (err) => console.log(err));
  mongoose.connection.on("open", () => console.log("database is connected "));

  // clear database before adding by deleteMany method
  try {
    await User.deleteMany({});
    console.log("refresh/delete users collection");
  } catch (err) {
    console.log(err);
  }

  // adding 10 users by map method and use faker inside it to generate data
  const userPromises = Array(10)
    .fill(null)
    .map(() => {
      const user = new User({
        // we use faker to create fake user
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });

      // save data in database by save method
      return user.save();
    });

  // make a promise
  try {
    await Promise.all(userPromises);
    console.log("users added to the database");
  } catch (err) {
    console.log(err);
  }
};

// call the connection function
main();
