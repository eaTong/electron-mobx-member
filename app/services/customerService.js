/**
 * Created by eatong on 17-3-22.
 */
const {CustomerModel, ConsumModal} = require('../models/CustomerModel');
const {Success, Failure} = require('../util/message');
const {Op, fn} = require('sequelize');

const uuidV4 = require('uuid/v4');

async function getCustomerList({keywords, pageIndex, pageSize}, callback) {
  const option = {
    where: {
      [Op.or]: [
        {name: {[Op.like]: `%${keywords}%`}},
        {telephone: {[Op.like]: `%${keywords}%`}},
      ]
    }
  };
  const {dataValues: {total}} = await CustomerModel.findOne({
    ...option,
    attributes: [[fn('COUNT', '*'), 'total']]
  });
  const data = await CustomerModel.findAll({
    offset: pageIndex * pageSize,
    limit: pageSize, ...option,
    include: [{model: ConsumModal}]
  });
  const list = data.map(item=>item.toJSON());
  callback && callback(Success({total, list}));
  return Success({total, list})

  // CustomerModel.findAll({include: [{model: ConsumModal}]})
  //   .then(data => {
  //     callback && callback(Success(data));
  //   }).catch(error => callback && callback(Failure(error)));
}

function addCustomer(data, callback) {
  CustomerModel.findOne({where: {number: data.number}})
    .then(result => {
      if (result) {
        data.id = uuidV4();
        data.member_id = result.id;
        ConsumModal.build(data).save()
          .then(consume => {
            data.tb_consum_list = [consume];
            callback && callback(Success(data));
          });
      } else {
        data.id = uuidV4();
        CustomerModel.build(data).save()
          .then(customer => {
            data.id = uuidV4();
            data.member_id = customer.id;
            ConsumModal.build(data).save()
              .then(consume => {
                data.tb_consum_list = [consume];
                callback && callback(Success(data));
              });
          })
          .catch(error => callback && callback(Failure(error)));
      }
    })
    .catch(error => callback && callback(Failure(error)));
}

function getCustomerByNumber(data, callback) {
  CustomerModel.findOne({where: {number: data.number}})
    .then(result => {
      callback && callback(Success(result ? result.toJSON() : {}));
    }).catch(error => callback && callback(Failure(error)));
}

module.exports = {
  getCustomerList,
  addCustomer,
  getCustomerByNumber
};
