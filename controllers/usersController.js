const { Users, Tarefas_has_Usuarios } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");
const transporter = require("../helpers/transporter");
require("dotenv/config");

const usersController = {
  async register(req, res) {
    const { name, email, password } = req.body;
    const newPassword = bcrypt.hashSync(password, 10);
    try {
      const user = await Users.findOne({
        where: {
          userEmail: email,
        },
      });
      if (user) {
        return res.status(409).json({ errorMessage: "Usuário já cadastrado!" });
      }
    } catch (error) {
      return res.status(400).send({ error: "Erro ao buscar usuário, tente novamente!" });
    }
    try {
      const createdUser = await Users.create({
        userName: name,
        userEmail: email,
        userPassword: newPassword,
        userScore: 0,
      });
      // await Tarefas_has_Usuarios.create({
      //   TarefaIdTarefas: 4,
      //   UsuarioIdUsuario: createdUser.userId,
      // });
      return res.status(201).json("Usuário Criado!");
    } catch (error) {
      return res.status(400).send({ error: "Erro ao criar usuário, tente novamente!" });
    }
  },
  // async buscarPontos(req, res) {
  //   const token = req.headers["authorization"];
  //   const id = jwt.verify(token, secret.key, (err, decoded) => decoded.userId);
  //   const usuario = await Usuarios.findOne({
  //     where: {
  //       userId: id,
  //     },
  //   });
  //   return res.json(usuario.pontos);
  // },
  async userData(req, res) {
    const token = req.headers["authorization"];
    try {
      const id = jwt.verify(token, secret.key, (err, decoded) => {
        return decoded.userId;
      });
      const user = await Users.findOne({
        where: {
          userId: id,
        },
      });
      return res.status(200).json({ name: user.userName, email: user.userEmail });
    } catch (error) {
      return res.status(400).send({ error: "Erro ao buscar nome do usuário, tente novamente!" });
    }
  },
  async passwordRecovery(req, res) {
    const { email } = req.body;
    try {
      const user = await Users.findOne({
        where: {
          userEmail: email,
        },
      });
      if (!user) {
        return res.status(404).json({ errorMessage: "Usuário não cadastrado!" });
      }
      const emailToken = jwt.sign(
        {
          userEmail: user.userEmail,
        },
        secret.key,
        { expiresIn: "2h" }
      );
      await transporter.sendMail({
        from: '"Up Money" <up.money.gama@gmail.com>',
        to: email,
        subject: "Recuperação de Senha",
        html: `<p>Olá! Você solicitou a alteração de senha do app Up Money!</p>
               <p>Acesse o endereço para alterar sua senha: </p><a href="${process.env.WEB_URL}/password-change?token=${emailToken}">${process.env.WEB_URL}/password-change?token=${emailToken}</a>`,
      });
      // console.log(info.messageId);
      return res.status(200).json({
        message: "E-mail enviado para alteração de senha!",
      });
    } catch (error) {
      return res.status(400).send({ errorMessage: "Erro ao verificar e-mail, tente novamente!" });
    }
  },
  async passwordChange(req, res) {
    const jwtToken = req.headers["authorization"];
    const { password } = req.body;
    try {
      const token = jwtToken.split(" ")[1];
      const email = jwt.verify(token, secret.key, (err, decoded) => {
        return decoded.userEmail;
      });
      const newPassword = bcrypt.hashSync(password, 10);
      const user = await Users.findOne({
        where: {
          userEmail: email,
        },
      });
      await user.update({ userPassword: newPassword });
      return res.status(200).json({ message: "Senha alterada!" });
    } catch (error) {
      return res.status(400).send({ errorMessage: "Erro ao alterar senha, tente novamente!" });
    }
  },
};

module.exports = usersController;
