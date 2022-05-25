const db = require("../database");

const MQualitativas_has_Usuarios = db.define(
  "MQualitativas_has_Usuarios",
  {},
  {
    timestamps: false,
    tableName: "metasqualitativas_has_usuarios",
  }
);

module.exports = MQualitativas_has_Usuarios;
