const Users = require("./Users");
const MetasQualitativas = require("./MetasQualitativas");
const Tarefas = require("./Tarefas");
const Videos = require("./Videos");
const MQualitativas_has_Usuarios = require("./MQualitativas_Usuarios");
const Tarefas_has_Usuarios = require("./Tarefas_Usuarios");

Tarefas.belongsToMany(Users, { through: Tarefas_has_Usuarios });
Users.belongsToMany(Tarefas, { through: Tarefas_has_Usuarios });
MetasQualitativas.hasMany(Videos);
Videos.belongsTo(MetasQualitativas);
MetasQualitativas.belongsToMany(Users, { through: MQualitativas_has_Usuarios });
Users.belongsToMany(MetasQualitativas, { through: MQualitativas_has_Usuarios });

module.exports = {
  Users,
  MetasQualitativas,
  Tarefas,
  Videos,
  MQualitativas_has_Usuarios,
  Tarefas_has_Usuarios,
};
