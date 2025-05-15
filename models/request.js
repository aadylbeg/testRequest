"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Requests extends Model {
    static associate() {}
  }
  Requests.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      solution: {
        type: DataTypes.STRING,
      },
      ignoreReason: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("CREATED", "PROCESS", "COMPLETED", "CANCELED"),
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: "requests",
      modelName: "Requests",
    }
  );
  return Requests;
};
