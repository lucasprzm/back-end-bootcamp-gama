var express = require("express");
var router = express.Router();
const metasController = require("../controllers/metasController");

// Rota para pegar as metas disponíveis

router.get("/", metasController.enviarMetas);
router.post("/salvar", metasController.salvarMetas);
router.get("/videos", metasController.buscarVideosPorMeta);
module.exports = router;
