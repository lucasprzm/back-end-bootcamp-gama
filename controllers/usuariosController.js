const { Usuarios } = require("../models");
const bcrypt = require("bcryptjs");

const usuariosController = {
  async registro(req, res) {
    const { nomeUsuario, emailUsuario, senhaUsuario } = req.body;
    const novaSenha = bcrypt.hashSync(senhaUsuario, 10);
    // const usuario = await Usuarios.findOne({
    //   where: {
    //     email,
    //   },
    // });
    // if (usuario) {
    //   return res.status(409).json({ mensagemDeErro: "Usuário já cadastrado!" });
    // }
    let novoUsuario = await Usuarios.create({
      nomeUsuario,
      emailUsuario,
      senhaUsuario: novaSenha,
    });

    return res.status(201).json({
      nome: novoUsuario.nomeUsuario,
      email: novoUsuario.emailUsuario,
    });
  },
};

module.exports = usuariosController;
