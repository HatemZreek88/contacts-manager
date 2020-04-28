// stage - 5

// import mongoose
const mongoose = require("mongoose");

//import uniqueValidator
const uniqueValidator = require("mongoose-unique-validator");

//destructure Schema
const { Schema } = mongoose;

// create UserSchema
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

//plugin uniqueValidator
UserSchema.plugin(uniqueValidator);

// export UserSchema
module.exports = mongoose.model("User", UserSchema);
