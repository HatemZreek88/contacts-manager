// stage - 4

// import mongoose
const mongoose = require("mongoose");

//destructure Schema
const { Schema } = mongoose;

// create UserSchema
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

// export UserSchema
module.exports = mongoose.model("User", UserSchema);
