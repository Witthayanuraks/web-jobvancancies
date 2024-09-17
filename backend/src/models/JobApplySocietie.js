const { DataTypes } = require("sequelize");
const { database } = require("../database");

const JobApplySocietiesModels = database.define(
  "job_apply_societies",
  {
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    society_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    job_vacancy_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "job_apply_societies",
  }
);

module.exports = JobApplySocietiesModels;
