/**
 * Created by eatong on 17-3-22.
 */
const Sequelize = require('sequelize');
const config = require('../../db.json');
const sequelize = new Sequelize(config.dbName, config.user, config.pwd, {
  host: config.host|| 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});
module.exports = {
  sequelize,
  Sequelize
};
