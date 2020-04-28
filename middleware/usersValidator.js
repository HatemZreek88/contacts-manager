// stage -5

// import body and validationResult from express validator
const { body, validationResult } = require("express-validator");

// create usersValidator
exports.validateUsers = () => {
  return [
    body("email").isEmail().normalizeEmail().withMessage("invalid Email"),

    body("password").isLength({ min: 5 }).withMessage("Password is too short"),

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
    body("userName")
      .notEmpty()
      .exists()
      .trim()
      .escape()
      .withMessage("Please give us your user name"),
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
