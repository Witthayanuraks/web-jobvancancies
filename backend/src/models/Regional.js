const { DataTypes } = require("sequelize");
const { database } = require("../database");

const RegionalModels = database.define("regionals", {
  province: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
},
{
    freezeTableName: true,
    tableName: "regionals"
});

module.exports = RegionalModels;
