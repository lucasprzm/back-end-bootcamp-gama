var express = require("express");
var router = express.Router();
const tarefasController = require("../controllers/tarefasController");

router.put("/atualizar", tarefasController.adicionarPontos, tarefasController.mudarTarefa);

module.exports = router;
