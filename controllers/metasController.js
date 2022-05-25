const { Usuarios, MetasQualitativas, MQualitativas_has_Usuarios, Videos } = require("../models");
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
      UsuarioIdUsuario: idUsuario,
      MetasQualitativaIdMetaQualitativa: idMeta,
    });

    //console.log(idUsuario);
    res.sendStatus(201);
  },
  async buscarVideosPorMeta(req, res) {
    const token = req.headers["authorization"];
    const idUsuario = jwt.verify(token, secret.key, (err, decoded) => {
      return decoded.idUsuario;
    });
    const metaUsuario = await Usuarios.findOne({
      where: { idUsuario: idUsuario },
      include: {
        model: MetasQualitativas,
      },
    });
    const videos = await Videos.findAll({
      where: {
        MetasQualitativaIdMetaQualitativa: metaUsuario.MetasQualitativas[0].idMetaQualitativa,
      },
    });
    return res.json(videos);
  },
};

module.exports = metasController;
