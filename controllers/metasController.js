const { MetasQualitativas, MQualitativas_has_Usuarios } = require("../models");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");

const metasController = {
  async enviarMetas(req, res) {
    const metas = await MetasQualitativas.findAll();
    return res.status(200).json(metas);
  },
  async salvarMetas(req, res) {
    const token = req.headers["authorization"];
    const idUsuario = jwt.verify(token, secret.key, (err, decoded) => {
      return decoded.idUsuario;
    });
    const { idMeta } = req.body;
    await MQualitativas_has_Usuarios.create({
      idUsuarioFK: idUsuario,
      idMetaQualitativaFK: idMeta,
    });

    //console.log(idUsuario);
    res.sendStatus(201);
  },
};

module.exports = metasController;
