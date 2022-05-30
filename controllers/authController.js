const { Usuarios } = require("../models");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");

const authController = {
  async login(req, res) {
    const { email, password } = req.body;

    const usuario = await Usuarios.findOne({
      where: {
        emailUsuario: email,
      },
    });
    if (!usuario) {
      return res.status(400).json("E-mail não cadastrado!");
    }
    if (!bcrypt.compareSync(password, usuario.senhaUsuario)) {
      return res.status(401).json("Senha inválida!");
    }
    const token = jwt.sign(
      {
        idUsuario: usuario.idUsuario,
      },
      secret.key,
      { expiresIn: "24h" }
    );

    return res.json(token);
  },
};

module.exports = authController;
