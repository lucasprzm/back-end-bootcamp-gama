var express = require("express");
var router = express.Router();
const tasksController = require("../controllers/tasksController");

// Adicionar pontos da tarefa concluída e mudar para a próxima tarefa.
router.put("/update", tasksController.adicionarPontos, tasksController.mudarTarefa);

module.exports = router;
