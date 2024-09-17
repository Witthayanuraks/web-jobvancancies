const { DataTypes } = require("sequelize");
const { database } = require("../database");

const JobCategorieModels = database.define(
  "job_categories",
  {
    job_category: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "job_categories",
  }
);

module.exports = JobCategorieModels;
