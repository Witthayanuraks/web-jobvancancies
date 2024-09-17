const { DataTypes } = require("sequelize");
const { database } = require("../database");

const ValidatorModels = database.define("validators", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("officer", "validator"),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = ValidatorModels;
