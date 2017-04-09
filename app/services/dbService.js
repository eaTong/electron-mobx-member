/**
 * Created by eatong on 17-4-9.
 */
const {sequelize} = require('../util/dbUtil');
const {Success, Failure} = require('../util/message');


function checkConnection(callback) {
  sequelize
    .authenticate()
    .then(function (err) {
      console.log('1111111');
      callback && callback(Success())
    })
    .catch(function (err) {
      console.log('222222', err);
      callback && callback(Failure('connection fail'))
    });
}
module.exports = {
  checkConnection
};
