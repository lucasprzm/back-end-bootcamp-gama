const { Users } = require("../models");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");

const authController = {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({
        where: {
          userEmail: email,
        },
      });
      if (!user) {
        return res.status(400).json({ errorMessage: "Senha ou e-mail incorreto!" });
      }
      if (!bcrypt.compareSync(password, user.userPassword)) {
        return res.status(401).json({ errorMessage: "Senha ou e-mail incorreto!" });
      }
      const token = jwt.sign(
        {
          userId: user.userId,
        },
        secret.key,
        { expiresIn: "24h" }
      );

      return res.status(200).json(token);
    } catch (error) {
      res.status(400).send({ error: "Erro ao realizar login, tente novamente!" });
    }
  },
};

module.exports = authController;
