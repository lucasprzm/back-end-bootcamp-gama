const db = require("../database");
const { DataTypes } = require("sequelize");
const MetasQualitativas = require("./MetasQualitativas");
const Usuarios = require("./Usuarios");

const MQualitativas_has_Usuarios = db.define(
  "MQualitativas_has_Usuarios",
  {
    idUsuarioFK: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      references: {
        model: Usuarios,
        key: "idUsuario",
      },
    },
    idMetaQualitativaFK: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: MetasQualitativas,
        key: "idMetaQualitativa",
      },
    },
  },
  {
    timestamps: false,
    tableName: "metasqualitativas_has_usuarios",
  }
);

module.exports = MQualitativas_has_Usuarios;
