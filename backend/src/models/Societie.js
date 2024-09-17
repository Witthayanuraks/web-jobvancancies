const { DataTypes } = require("sequelize");
const { database } = require("../database");

const SocietiesModels = database.define(
  "societies",
  {
    id_card_number: {
      type: DataTypes.CHAR(8),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      born_date: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    regional_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    login_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "societies",
  }
);

module.exports = SocietiesModels;
