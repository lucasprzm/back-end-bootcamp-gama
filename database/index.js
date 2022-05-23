const Sequelize = require("sequelize");
require("dotenv/config");

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
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
