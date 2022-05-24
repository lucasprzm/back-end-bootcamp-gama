const Usuarios = require("./Usuarios");
const MetasQualitativas = require("./MetasQualitativas");
const Tarefas = require("./Tarefas");
const Videos = require("./Videos");
const MetasFinanceiras = require("./MetasFinanceiras");
const Pontuacoes = require("./Pontuacoes");

Tarefas.hasOne(Pontuacoes);
Pontuacoes.belongsTo(Tarefas);
Usuarios.hasOne(Pontuacoes);
Pontuacoes.belongsTo(Usuarios);
MetasQualitativas.hasMany(Videos);
Videos.belongsTo(MetasQualitativas);
MetasQualitativas.hasMany(MetasFinanceiras);
MetasFinanceiras.belongsTo(MetasQualitativas);
Usuarios.hasMany(MetasFinanceiras);
MetasFinanceiras.belongsTo(Usuarios);

module.exports = { Usuarios, MetasQualitativas, Tarefas, Videos, MetasFinanceiras, Pontuacoes };
