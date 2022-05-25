const metasController = require("../controllers/metasController");
const router = require("./users");

// Rota para pegar as metas disponíveis

router.get("/", metasController.enviarMetas);
router.post("/salvar", metasController.salvarMetas);
module.exports = router;
