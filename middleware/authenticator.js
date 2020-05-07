// import adminSchema
const Admin = require("../models/adminSchema");

// import http-errors
const createError = require("http-errors");

// authenticator for admins
const auth = async (req, res, next) => {
  const token = req.header("x-auth");

  try {
    const admin = await Admin.findByToken(token);

    if (!admin) throw createError(403);
    req.user = admin;
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
};

// export authenticator
module.exports = { auth };
