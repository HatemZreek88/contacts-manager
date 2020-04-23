// we will create a schema for my database

// import mongoose
const mongoose = require("mongoose");

//take out the schema from mongoose
const { Schema } = mongoose;

// create the schema

// the constructor
// if we want to pass more than one value we should put it inside object
const UserSchema = new Schema(
  {
    // properties
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    // methods
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// methods create
// virtual method for split name to first name and last name
UserSchema.virtual("fullname").get(() => {
  return `${this.firstName} ${this.lastName}`;
});

// export schema by model method and passing a  collection name  and the name of the schema.
module.exports = mongoose.model("User", UserSchema);
