//stage 4

// import contactSchema
const Contact = require("../models/contactSchema");

// import http-errors
const createError = require("http-errors");

//requests functions
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json({ success: true, contacts: contacts });
  } catch (err) {
    next(err);
  }
};

exports.getContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) throw createError(404);
    res.json({ success: true, contact: contact });
  } catch (err) {
    next(err);
  }
};

exports.postContact = async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, contact: contact });
  } catch (err) {
    next(err);
  }
};

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
