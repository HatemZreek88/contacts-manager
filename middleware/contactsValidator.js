// stage -5

// import body and validationResult from express validator
const { body, validationResult } = require("express-validator");

// create contactsValidator
exports.validateContacts = () => {
  return [
    body("email").isEmail().normalizeEmail().withMessage("invalid Email"),

    body("firstName")
      .notEmpty()
      .exists()
      .trim()
      .escape()
      .withMessage("Please give us your first name"),
    body("lastName")
      .notEmpty()
      .exists()
      .trim()
      .escape()
      .withMessage("Please give us your last name"),
    body("address.street")
      .notEmpty()
      .exists()
      .trim()
      .escape()
      .withMessage("Please give us your street"),
    body("address.region")
      .notEmpty()
      .exists()
      .trim()
      .escape()
      .withMessage("Please give us your region"),
    body("address.city")
      .notEmpty()
      .exists()
      .trim()
      .escape()
      .withMessage("Please give us your city"),
    body("address.country")
      .notEmpty()
      .exists()
      .trim()
      .escape()
      .withMessage("Please give us your country"),

    (req, res, next) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        let err = errors.errors.map((er) => ({
          [er.param]: er.msg,
        }));
        res.json({ status: 203, message: err });
      }
      next();
    },
  ];
};
