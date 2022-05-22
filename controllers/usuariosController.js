const { Usuarios } = require("../models");
const bcrypt = require("bcryptjs");

const usuariosController = {
  async registro(req, res) {
    const { nome, email, senha } = req.body;
    const novaSenha = bcrypt.hashSync(senha, 10);
    const usuario = await Usuarios.findOne({
      where: {
        email,
      },
    });
    if (usuario) {
      return res.status(409).json({ mensagemDeErro: "Usuário já cadastrado!" });
    }
    let novoUsuario = await Usuarios.create({
      nome,
      email,
      senha: novaSenha,
    });

    return res.status(201).json({
      nome: novoUsuario.nome,
      email: novoUsuario.email,
    });
  },
};

module.exports = usuariosController;
