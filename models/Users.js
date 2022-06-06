const db = require("../database");
const { DataTypes } = require("sequelize");

const Users = db.define(
  "Users",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
    },
    userEmail: {
      type: DataTypes.STRING,
    },
    userPassword: {
      type: DataTypes.STRING,
    },
    userAvatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userScore: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

module.exports = Users;
