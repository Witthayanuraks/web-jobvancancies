const { Sequelize } = require("sequelize");

const database = new Sequelize("lks", "root", "adwjs", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false,
  },
  logging: false
});

module.exports = {
  database,
};
