const { DataTypes } = require("sequelize");
const { database } = require("../database");

const JobSocietieModels = database.define("job_apply_societies", {
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  society_id: {
    type: DataTypes.INTEGER,
  },
  job_vacancy_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
},{
    freezeTableName:true,
    tableName: "job_apply_societies"
});

module.exports = JobSocietieModels;
