/**
 * Created by eatong on 17-3-22.
 */
const Sequelize = require('sequelize');

global.dbConfig = {
  name: 'member',
  user: 'root',
  pwd: 'zhou'
};
console.log(global.dbConfig);
const sequelize = new Sequelize(global.dbConfig.name, global.dbConfig.user, global.dbConfig.pwd, {
  host: global.dbConfig.address || 'localhost',
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
