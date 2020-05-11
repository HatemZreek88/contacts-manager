// import http-errors
const createError = require("http-errors");

// import adminSchema
const Admin = require("../models/adminSchema");

// import jsonwebtoken
const jwt = require("jsonwebtoken");

// GET admins method
exports.getAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    res.json({ success: true, admins: admins });
  } catch (err) {
    next(err);
  }
};

// GET admin Method
exports.getAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);

    if (!admin) throw createError(404);
    res.json({ success: true, admin: admin });
  } catch (err) {
    next(err);
  }
};

// POST admin method
exports.postAdmin = async (req, res, next) => {
  try {
    const admin = new Admin(req.body);
    const token = admin.generateAuthToken();
    await admin.save();
    const data = admin.getPublicFields();
    res.header("x-auth", token).json({ success: true, admin: data });
  } catch (err) {
    next(err);
  }
};

// PUT admin method
exports.putAdmin = async (req, res, next) => {
  const { id } = req.params;
  const admin = req.body;
  try {
    const updateAdmin = await Admin.findByIdAndUpdate(id, admin, { new: true });
    if (!updateAdmin) throw createError(500);
    res.json({ success: true, admin: updateAdmin });
  } catch (err) {
    next(err);
  }
};

// DELETE admin method
exports.deleteAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      throw createError(500);
    }
    res.json({ success: true, admin: admin });
  } catch (err) {
    next(err);
  }
};

// LOGIN method
exports.login = async (req, res, next) => {
  const { userName, password } = req.body;
  // console.log(userName);
  try {
    const admin = await Admin.findOne({ userName });
    console.log(userName);
    const valid = await admin.checkPassword(password);
    // console.log(password);
    if (!valid) throw createError(403);
    let token = admin.generateAuthToken();
    const data = admin.getPublicFields();
    res.header("x-auth", token).json({ success: true, admin: data });
  } catch (err) {
    next(err);
  }
};
