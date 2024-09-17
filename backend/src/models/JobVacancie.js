const { DataTypes } = require("sequelize");
const { database } = require("../database");

const JobVacancieModels = database.define("job_vacancies", {
  job_catogory_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  company: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},{
    freezeTableName: true,
    tableName: "job_vacancies"
});

module.exports = JobVacancieModels;
