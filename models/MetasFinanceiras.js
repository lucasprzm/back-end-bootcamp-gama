const db = require("../database");
const { DataTypes } = require("sequelize");
const MetasQualitativas = require("./MetasQualitativas");
const Usuarios = require("./Usuarios");

const MetasFinanceiras = db.define(
  "MetasFinanceiras",
  {
    idmetaFinanceira: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUsuarioFK: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuarios,
        key: "idUsuario",
      },
    },
    idmetaQualitativaFK: {
      type: DataTypes.INTEGER,
      references: {
        model: MetasQualitativas,
        key: "idMetaQualitativa",
      },
    },
  },
  {
    timestamps: false,
    tableName: "metasfinanceiras",
  }
);

module.exports = MetasFinanceiras;
