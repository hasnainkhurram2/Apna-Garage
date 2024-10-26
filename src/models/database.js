const { Sequelize } = require('sequelize');
const config = require('../config/config.js');

const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect,
  }
);

module.exports = sequelize;
