const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");
module.exports = function checkToken(req, res, next) {
  const jwtAuth = req.headers["authorization"];

  // Efetuando a validação do JWT:

  jwt.verify(jwtAuth, secret.key, (err, userInfo) => {
    if (err) {
      res.status(403).end();
      return;
    }
  });
  next();
};
