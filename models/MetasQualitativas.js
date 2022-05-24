const db = require("../database");
const { DataTypes } = require("sequelize");

const MetasQualitativas = db.define(
  "MetasQualitativas",
  {
    idMetaQualitativa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    metaQualitativa: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "metasqualitativas",
  }
);

module.exports = MetasQualitativas;
