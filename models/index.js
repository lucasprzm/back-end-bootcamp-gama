const Usuarios = require("./Usuarios");
const MetasQualitativas = require("./MetasQualitativas");
const Tarefas = require("./Tarefas");
const Videos = require("./Videos");
const MQualitativas_has_Usuarios = require("./MQualitativas_Usuarios");
const Pontuacoes = require("./Pontuacoes");

Tarefas.hasOne(Pontuacoes);
Pontuacoes.belongsTo(Tarefas);
Usuarios.hasOne(Pontuacoes);
Pontuacoes.belongsTo(Usuarios);
MetasQualitativas.hasMany(Videos);
Videos.belongsTo(MetasQualitativas);
MetasQualitativas.belongsToMany(Usuarios, { through: "MQualitativas_has_Usuarios" });
Usuarios.belongsToMany(MetasQualitativas, { through: "MQualitativas_has_Usuarios" });

module.exports = {
  Usuarios,
  MetasQualitativas,
  Tarefas,
  Videos,
  MQualitativas_has_Usuarios,
  Pontuacoes,
};
