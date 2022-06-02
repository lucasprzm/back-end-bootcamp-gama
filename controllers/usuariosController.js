const { Usuarios, Tarefas_has_Usuarios } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");
const transporter = require("../helpers/transporter");

const usuariosController = {
  async registro(req, res) {
    const { name, email, password } = req.body;
    const novaSenha = bcrypt.hashSync(password, 10);
    try {
      const usuario = await Usuarios.findOne({
        where: {
          emailUsuario: email,
        },
      });
      if (usuario) {
        return res.status(409).json({ errorMessage: "Usuário já cadastrado!" });
      }
    } catch (error) {
      res.status(400).send({ error: "Erro ao buscar usuário, tente novamente!" });
    }
    try {
      const usuarioCriado = await Usuarios.create({
        nomeUsuario: name,
        emailUsuario: email,
        senhaUsuario: novaSenha,
        pontos: 0,
      });
      await Tarefas_has_Usuarios.create({
        TarefaIdTarefas: 4,
        UsuarioIdUsuario: usuarioCriado.idUsuario,
      });
      return res.status(201).json("Usuário Criado!");
    } catch (error) {
      res.status(400).send({ error: "Erro ao criar usuário, tente novamente!" });
    }
  },
  async buscarPontos(req, res) {
    const token = req.headers["authorization"];
    const id = jwt.verify(token, secret.key, (err, decoded) => decoded.idUsuario);
    const usuario = await Usuarios.findOne({
      where: {
        idUsuario: id,
      },
    });
    return res.json(usuario.pontos);
  },
  async userName(req, res) {
    const token = req.headers["authorization"];
    const id = jwt.verify(token, secret.key, (err, decoded) => {
      return decoded.idUsuario;
    });
    try {
      const usuario = await Usuarios.findOne({
        where: {
          idUsuario: id,
        },
      });
      return res.json({ name: usuario.nomeUsuario });
    } catch (error) {
      res.status(400).send({ error: "Erro ao buscar nome do usuário, tente novamente!" });
    }
  },
  async passwordRecovery(req, res) {
    const { email } = req.body;
    const usuario = await Usuarios.findOne({
      where: {
        emailUsuario: email,
      },
    });
    if (!usuario) {
      return res.status(400).json({ errorMessage: "Usuário não cadastrado!" });
    }
    const emailToken = jwt.sign(
      {
        emailUsuario: usuario.emailUsuario,
      },
      secret.key,
      { expiresIn: "2h" }
    );
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Up Money" <up.money.gama@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Recuperação de Senha", // Subject line
      text: `Olá! Você solicitou a alteração de senha do app Up Money!
            Acesse o endereço para alterar sua senha: https://ga-up-money.netlify.app/password-change/${encodeURIComponent(
              emailToken
            )}`, // plain text body
      html: `<p>Olá! Você solicitou a alteração de senha do app Up Money!</p>
             <p>Acesse o endereço para alterar sua senha: </p><a href="https://ga-up-money.netlify.app/password-change/${encodeURIComponent(
               emailToken
             )}">https://ga-up-money.netlify.app/password-change/${encodeURIComponent(emailToken)}`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    return res.status(200).json({
      message: "E-mail enviado para alteração de senha!",
      token: encodeURIComponent(emailToken),
    });
  },
  async passwordChange(req, res) {
    const token = req.headers["authorization"];
    const { password } = req.body;
    const newPassword = bcrypt.hashSync(password, 10);
    const email = jwt.verify(decodeURIComponent(token), secret.key, (err, decoded) => {
      return decoded.emailUsuario;
    });
    await Usuarios.update(
      { senhaUsuario: newPassword },
      {
        where: {
          emailUsuario: email,
        },
      }
    );
    return res.status(200).json({ message: "Senha alterada!" });
  },
};

module.exports = usuariosController;
