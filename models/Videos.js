const db = require("../database");
const { DataTypes } = require("sequelize");
const MetasQualitativas = require("./MetasQualitativas");

const Videos = db.define(
  "Videos",
  {
    idVideo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    urlVideo: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "videos",
  }
);

module.exports = Videos;
