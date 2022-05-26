var express = require("express");
var router = express.Router();
const tarefasController = require("../controllers/tarefasController");

// Adicionar pontos da tarefa concluída e mudar para a próxima tarefa.
router.put("/atualizar", tarefasController.adicionarPontos, tarefasController.mudarTarefa);

module.exports = router;
