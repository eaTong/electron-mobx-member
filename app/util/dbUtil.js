/**
 * Created by eatong on 17-3-22.
 */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('member', 'root', 'zhou', {
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
