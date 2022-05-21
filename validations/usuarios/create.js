const { body } = require("express-validator");

module.exports = [
  body("nome").isAlpha(),
  body("email").isEmail(),
  body("senha").isStrongPassword(),
];
