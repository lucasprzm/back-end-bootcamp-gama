const { Usuarios } = require("../models");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");

const authController = {
  async login(req, res) {
    const { emailUsuario, senhaUsuario } = req.body;

    const usuario = await Usuarios.findOne({
      where: {
        emailUsuario,
      },
    });
    if (!usuario) {
      return res.status(400).json("E-mail não cadastrado!");
    }
    if (!bcrypt.compareSync(senhaUsuario, usuario.senhaUsuario)) {
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
