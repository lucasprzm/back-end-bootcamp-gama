const db = require("../database");

const Tarefas_has_Usuarios = db.define(
  "Tarefas_has_Usuarios",
  {},
  {
    timestamps: false,
    tableName: "tarefas_has_usuarios",
  }
);

module.exports = Tarefas_has_Usuarios;
