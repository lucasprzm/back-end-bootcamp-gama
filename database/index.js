const Sequelize = require("sequelize");

const DB_NAME = "heroku_768a8d0284aba9f";
const DB_USER = "bdf0c78755d507";
const DB_PASS = "0e8c2a30";
const DB_CONFIG = {
  dialect: "mysql",
  host: "us-cdbr-east-05.cleardb.net",
  port: "3306",
};

let db = {};

try {
  db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
} catch (error) {
  console.error("Erro ao tentar conectar com o banco de dados");
}

async function hasConnection() {
  try {
    await db.authenticate();
    console.log("Banco de dados conectado!");
  } catch (error) {
    console.error("Erro ao tentar conectar com o banco de dados!");
  }
}

Object.assign(db, {
  hasConnection,
});

module.exports = db;
