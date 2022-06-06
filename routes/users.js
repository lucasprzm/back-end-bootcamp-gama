var express = require("express");
var router = express.Router();
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");
const checkToken = require("../helpers/validaJwt");

// Registro de novo usuário
router.post("/new", usersController.register);

// Login de usuário
router.post("/login", authController.login);

// Buscar pontos
//router.get("/score", usersController.buscarPontos);

// Buscar nome de Usuário
router.get("/userdata", usersController.userData);

// Validação do token
// router.get("/token-validation", checkToken);

// Recebimento do e-mail do usuário para recuperação de senha e envio do e-mail
router.post("/password-recovery", usersController.passwordRecovery);

// Alteração da senha do usuário após a solicitação de recuperação
router.put("/password-change", usersController.passwordChange);

module.exports = router;
