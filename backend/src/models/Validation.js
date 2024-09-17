const { DataTypes } = require("sequelize");
const { database } = require("../database");

const ValidationModels = database.define(
  "validations",
  {
    job_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    society_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    validator_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("accepted", "declined", "pending"),
      allowNull: false,
    },
    wrok_experience: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    job_position: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reason_accepted: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    validator_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "validations",
  }
);

module.exports = ValidationModels;
