// stage - 6

// import mongoose
const mongoose = require("mongoose");

// destructure Schema from mongoose
const { Schema } = mongoose;

// create AddressSchema
const AddressSchema = new Schema({
  street: { type: String, required: true },
  houseNo: { type: Number, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  postCode: { type: String, required: true },
  country: { type: String, required: true },
});

// add AddressSchema to ContactSchema
module.exports = AddressSchema;
