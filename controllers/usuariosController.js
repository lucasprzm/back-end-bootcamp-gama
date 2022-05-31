const { Usuarios, Tarefas_has_Usuarios } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");

const usuariosController = {
  async registro(req, res) {
    const { name, email, password } = req.body;
    const novaSenha = bcrypt.hashSync(password, 10);
    const usuario = await Usuarios.findOne({
      where: {
        emailUsuario: email,
      },
    });
    if (usuario) {
      return res.status(409).json({ errorMessage: "Usuário já cadastrado!" });
    }
    const usuarioCriado = await Usuarios.create({
      nomeUsuario: name,
      emailUsuario: email,
      senhaUsuario: novaSenha,
      pontos: 0,
    });
    // console.log(usuarioCriado);
    await Tarefas_has_Usuarios.create({
      TarefaIdTarefas: 4,
      UsuarioIdUsuario: usuarioCriado.idUsuario,
    });
    return res.status(201).json("Usuário Criado!");
  },
  async buscarPontos(req, res) {
    const token = req.headers["authorization"];
    const id = jwt.verify(token, secret.key, (err, decoded) => decoded.idUsuario);
    const usuario = await Usuarios.findOne({
      where: {
        idUsuario: id,
      },
    });
    res.json(usuario.pontos);
  },
  async userName(req,res) {
    const token = req.headers["authorization"];
    const id = jwt.verify(token, secret.key, (err, decoded) => decoded.idUsuario);
    const usuario = await Usuarios.findOne({
      where: {
        idUsuario: id,
      },
    });
    res.json(usuario.nomeUsuario);
  }
};

module.exports = usuariosController;
