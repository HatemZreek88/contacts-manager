// import contactSchema
const Contact = require("../models/contactSchema");

// import http-errors
const createError = require("http-errors");

//import jsonWebToken
const jwt = require("jsonwebtoken");

// import config file
const env = require("../config/config");

//GET contacts method
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().populate("user");
    res.json({ success: true, contacts: contacts });
  } catch (err) {
    next(err);
  }
};

//GET contact method
exports.getContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id).populate("user", "-__v");
    if (!contact) throw createError(404);
    res.json({ success: true, contact: contact });
  } catch (err) {
    next(err);
  }
};

//POST contact method
exports.postContact = async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, contact: contact });
  } catch (err) {
    next(err);
  }
};

//PUT contact method
exports.putContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = req.body;
  try {
    const updatecontact = await Contact.findByIdAndUpdate(id, contact, {
      new: true,
    });
    if (!updatecontact) throw createError(500);
    res.json({ success: true, contact: updatecontact });
  } catch (err) {
    next(err);
  }
};

//DELETE contact method
exports.deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      throw createError(500);
    }
    res.json({ success: true, contact: contact });
  } catch (err) {
    next(err);
  }
};
