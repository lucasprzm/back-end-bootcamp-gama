var express = require("express");
var router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const authController = require("../controllers/authController");
const checkToken = require("../helpers/validaJwt");

// Registro de novo usuário
router.post("/new", usuariosController.registro);

// Login de usuário
router.post("/login", authController.login);

// Buscar pontos
router.get("/pontos", usuariosController.buscarPontos);

// Buscar nome de Usuário
router.get("/userdata", usuariosController.userData);

// Validação do token
router.get("/token-validation", checkToken);

// Recebimento do e-mail do usuário para recuperação de senha e envio do e-mail
router.post("/password-recovery", usuariosController.passwordRecovery);

// Alteração da senha do usuário após a solicitação de recuperação
router.put("/password-change", usuariosController.passwordChange);

module.exports = router;
