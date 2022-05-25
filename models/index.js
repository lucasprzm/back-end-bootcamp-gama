const Usuarios = require("./Usuarios");
const MetasQualitativas = require("./MetasQualitativas");
const Tarefas = require("./Tarefas");
const Videos = require("./Videos");
const MQualitativas_has_Usuarios = require("./MQualitativas_Usuarios");
const Tarefas_has_Usuarios = require("./Tarefas_Usuarios");

Tarefas.belongsToMany(Usuarios, { through: Tarefas_has_Usuarios });
Usuarios.belongsToMany(Tarefas, { through: Tarefas_has_Usuarios });
MetasQualitativas.hasMany(Videos);
Videos.belongsTo(MetasQualitativas);
MetasQualitativas.belongsToMany(Usuarios, { through: MQualitativas_has_Usuarios });
Usuarios.belongsToMany(MetasQualitativas, { through: MQualitativas_has_Usuarios });

module.exports = {
  Usuarios,
  MetasQualitativas,
  Tarefas,
  Videos,
  MQualitativas_has_Usuarios,
  Tarefas_has_Usuarios,
};
