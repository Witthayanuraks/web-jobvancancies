const { DataTypes } = require("sequelize");
const { database } = require("../database");

const UserModels = database.define(
  "users",
  {
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "users",
  }
);

module.exports = UserModels;
