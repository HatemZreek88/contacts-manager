// stage - 5

// import mongoose
const mongoose = require("mongoose");

//import uniqueValidator
const uniqueValidator = require("mongoose-unique-validator");

// import AddressSchema
const AddressSchema = require("./addressSchema");

//destructure Schema
const { Schema } = mongoose;

// create ContactSchema
const ContactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  address: AddressSchema,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

//plugin uniqueValidator
ContactSchema.plugin(uniqueValidator);

// export ContactSchema
module.exports = mongoose.model("Contact", ContactSchema);
