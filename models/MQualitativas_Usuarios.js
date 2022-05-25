const db = require("../database");
const { DataTypes } = require("sequelize");
const MetasQualitativas = require("./MetasQualitativas");
const Usuarios = require("./Usuarios");

const MQualitativas_has_Usuarios = db.define(
  "MQualitativas_has_Usuarios",
  {},
  {
    timestamps: false,
    tableName: "metasqualitativas_has_usuarios",
  }
);

module.exports = MQualitativas_has_Usuarios;
