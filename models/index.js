const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const Sequelize = require("sequelize");
mongoose.Promise = global.Promise;

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.data = require("./data.model.js")(mongoose);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.log = require("./log.model.js")(sequelize, Sequelize);
module.exports = db;