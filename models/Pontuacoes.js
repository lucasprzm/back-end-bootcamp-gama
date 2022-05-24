const db = require("../database");
const { DataTypes } = require("sequelize");
const Tarefas = require("./Tarefas");
const Usuarios = require("./Usuarios");

const Pontuacoes = db.define(
  "Pontuacoes",
  {
    pontos: {
      type: DataTypes.INTEGER,
    },
    idUsuarioFK: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuarios,
        key: "idUsuario",
      },
    },
    idTarefasFK: {
      type: DataTypes.INTEGER,
      references: {
        model: Tarefas,
        key: "idTarefas",
      },
    },
  },
  {
    timestamps: false,
    tableName: "pontuacoes",
  }
);

module.exports = Pontuacoes;
