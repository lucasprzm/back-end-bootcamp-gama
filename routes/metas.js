var express = require("express");
var router = express.Router();
const metasController = require("../controllers/metasController");

// Rota para pegar as metas disponíveis
router.get("/", metasController.enviarMetas);
// Rota para salvar meta do usuário específico
router.post("/salvar", metasController.salvarMetas);
// Buscar vídeos específicos para a meta do usuário
router.get("/videos", metasController.buscarVideosPorMeta);
module.exports = router;
