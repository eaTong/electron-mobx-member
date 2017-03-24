/**
 * Created by eatong on 17-3-22.
 */
const {sequelize, Sequelize} = require('../util/dbUtil');

const CustomerModel = sequelize.define('tb_member', {
  id: {type: Sequelize.UUID, unique: true, primaryKey: true},
  number: {type: Sequelize.STRING, unique: true},
  name: {type: Sequelize.STRING},
  namedex: {type: Sequelize.STRING},
  telephone: {type: Sequelize.STRING},
  points: {type: Sequelize.INTEGER},
  rest_points: {type: Sequelize.INTEGER}
}, {
  tableName: 'tb_member',
  createdAt: false,
  updatedAt: false
});
const ConsumModal = sequelize.define('tb_consum_list', {
  id: {type: Sequelize.UUID, unique: true, primaryKey: true},

  name: {type: Sequelize.STRING},
  namedex: {type: Sequelize.STRING},
  telephone: {type: Sequelize.STRING},
  qjLeft: {type: Sequelize.STRING},
  zjLeft: {type: Sequelize.STRING},
  zwLeft: {type: Sequelize.STRING},
  qjRight: {type: Sequelize.STRING},
  zjRight: {type: Sequelize.STRING},
  zwRight: {type: Sequelize.STRING},
  tj: {type: Sequelize.STRING},
  conLeft: {type: Sequelize.STRING},
  conRight: {type: Sequelize.STRING},
  otherInfo: {type: Sequelize.STRING},
  usePoints: {type: Sequelize.INTEGER},
  amount: {type: Sequelize.FLOAT},
  getPoints: {type: Sequelize.INTEGER},
  consumeDate: {type: Sequelize.DATE},

}, {
  tableName: 'tb_consum_list',
  createdAt: false,
  updatedAt: false
});

CustomerModel.hasMany(ConsumModal, {foreignKey: 'member_id'});
ConsumModal.belongsTo(CustomerModel, {foreignKey: 'member_id'});
module.exports = {CustomerModel , ConsumModal};
