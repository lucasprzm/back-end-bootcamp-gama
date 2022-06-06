const { Usuarios, Tarefas, Tarefas_has_Usuarios } = require("../models/index");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");
const { Op } = require("sequelize");

const tarefasController = {
  async adicionarPontos(req, res, next) {
    const token = req.headers["authorization"];
    const idUsuario = jwt.verify(token, secret.key, (err, decoded) => {
      return decoded.idUsuario;
    });
    const tarefaUsuario = await Usuarios.findOne({
      where: { idUsuario: idUsuario },
      include: {
        model: Tarefas,
      },
    });
    await Usuarios.increment(
      { pontos: tarefaUsuario.Tarefas[0].pontosTarefa },
      {
        where: { idUsuario: idUsuario },
      }
    );
    next();
  },
  async mudarTarefa(req, res) {
    const token = req.headers["authorization"];
    const idUsuario = jwt.verify(token, secret.key, (err, decoded) => {
      return decoded.idUsuario;
    });
    const tarefaUsuario = await Usuarios.findOne({
      where: { idUsuario: idUsuario },
      include: {
        model: Tarefas,
      },
    });
    const proximaTarefa = await Tarefas.findOne({
      where: {
        idTarefas: {
          [Op.gt]: tarefaUsuario.Tarefas[0].idTarefas,
        },
      },
    });
    await Tarefas_has_Usuarios.update(
      {
        TarefaIdTarefas: proximaTarefa.idTarefas,
      },
      { where: { UsuarioIdUsuario: idUsuario } }
    );
    res.json("Tarefa Atualizada!");
  },
};

module.exports = tarefasController;
