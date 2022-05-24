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
    metaQualitativa: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "tarefas",
  }
);

module.exports = Tarefas;
