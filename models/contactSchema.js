// stage - 5

// import mongoose
const mongoose = require("mongoose");

//import uniqueValidator
const uniqueValidator = require("mongoose-unique-validator");

//destructure Schema
const { Schema } = mongoose;

// create ContactSchema
const ContactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  street: { type: String, required: true },
  houseNo: { type: Number, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  postCode: { type: String, required: true },
  country: { type: String, required: true },
  phoneNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

//plugin uniqueValidator
ContactSchema.plugin(uniqueValidator);

// export ContactSchema
module.exports = mongoose.model("Contact", ContactSchema);
