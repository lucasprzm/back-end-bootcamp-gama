const db = require("../database");
const { DataTypes } = require("sequelize");

const Usuarios = db.define(
  "Usuarios",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomeUsuario: {
      type: DataTypes.STRING,
    },
    emailUsuario: {
      type: DataTypes.STRING,
    },
    senhaUsuario: {
      type: DataTypes.STRING,
    },
    avatarUsuario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pontos: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: "usuarios",
  }
);

module.exports = Usuarios;
