const { Usuarios, Tarefas_has_Usuarios } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");

const usuariosController = {
  async registro(req, res) {
    const { nomeUsuario, emailUsuario, senhaUsuario } = req.body;
    const novaSenha = bcrypt.hashSync(senhaUsuario, 10);
    const usuario = await Usuarios.findOne({
      where: {
        emailUsuario,
      },
    });
    if (usuario) {
      return res.status(409).json({ mensagemDeErro: "Usuário já cadastrado!" });
    }
    const usuarioCriado = await Usuarios.create({
      nomeUsuario,
      emailUsuario,
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
    const idUsuario = jwt.verify(token, secret.key, (err, decoded) => {
      return decoded.idUsuario;
    });
    const usuario = await Usuarios.findOne({
      where: {
        idUsuario: idUsuario,
      },
    });
    res.json(usuario.pontos);
  },
};

module.exports = usuariosController;
