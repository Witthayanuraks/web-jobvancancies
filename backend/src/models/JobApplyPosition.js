const { DataTypes } = require("sequelize");
const { database } = require("../database");

const JobApplyPositionModels = database.define(
  "job_apply_position",
  {
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    society_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    job_vacancy_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    job_apply_societies_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "reject"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "job_apply_position",
  }
);

module.exports = JobApplyPositionModels;
