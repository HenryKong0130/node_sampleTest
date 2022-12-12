const { Sequelize } = require("sequelize");
const {sqlLogger} = require('../logger')

const sequelize = new Sequelize("myschooldb", "root", "KFF123!!!", {
  host: "localhost",
  dialect: "mysql",
  logging: (msg)=>{
    sqlLogger.info(msg)
  }
});

module.exports = sequelize;
