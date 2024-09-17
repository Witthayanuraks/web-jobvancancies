const { DataTypes } = require("sequelize");
const { database } = require("../database");

const AvaliablePositionsModels = database.define("avaliable_positions", {
  job_vacancy_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  position: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  apply_capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
   freezeTableName: true,
   tableName: "avaliable_positions" 
});

module.exports = AvaliablePositionsModels;
