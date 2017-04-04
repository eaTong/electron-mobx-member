/**
 * Created by eatong on 17-3-22.
 */
const Sequelize = require('sequelize');
const config = {
  name: 'member',
  user: 'root',
  pwd: 'zhou'
};

const sequelize = new Sequelize(config.name, config.user, config.pwd, {
  host: 'localhost',
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
