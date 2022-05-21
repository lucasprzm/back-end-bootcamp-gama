const { Usuarios } = require("../models");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");

const authController = {
  async login(req, res) {
    const { email, senha } = req.body;

    const usuario = await Usuarios.findOne({
      where: {
        email,
      },
    });
    if (!usuario) {
      return res.status(400).json("E-mail não cadastrado!");
    }
    if (!bcrypt.compareSync(senha, usuario.senha)) {
      return res.status(401).json("Senha inválida!");
    }
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
      },
      secret.key,
      { expiresIn: "24h" }
    );

    return res.json(token);
  },
};

module.exports = authController;
