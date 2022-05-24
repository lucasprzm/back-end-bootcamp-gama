const db = require("../database");
const { DataTypes } = require("sequelize");

const Tarefas = db.define(
  "Tarefas",
  {
    idTarefas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tarefa: {
      type: DataTypes.STRING,
    },
    diaTarefa: {
      type: DataTypes.STRING,
    },
    numeroTarefa: {
      type: DataTypes.INTEGER,
    },
    pontosTarefa: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: "tarefas",
  }
);

module.exports = Tarefas;
