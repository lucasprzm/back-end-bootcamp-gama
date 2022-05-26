var express = require("express");
var router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const authController = require("../controllers/authController");
// const checkToken = require("../helpers/validaJwt");

// Registro de novo usuário
router.post("/new", usuariosController.registro);

// Login de usuário
router.post("/login", authController.login);

// Buscar pontos
router.get("/pontos", usuariosController.buscarPontos);
// router.get("/testeAuth", checkToken, (req, res) => res.json("Deu bom!"));
module.exports = router;
