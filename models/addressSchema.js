// import mongoose
const mongoose = require("mongoose");

// destructure Schema from mongoose
const { Schema } = mongoose;

// AddressSchema
const AddressSchema = new Schema({
  street: { type: String, required: true },
  houseNo: { type: Number, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  postCode: { type: String, required: true },
  country: { type: String, required: true },
});

// export AddressSchema
module.exports = AddressSchema;
