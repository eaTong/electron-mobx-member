/**
 * Created by eatong on 17-3-22.
 */
const {CustomerModel, ConsumModal} = require('../models/CustomerModel');
const {Success, Failure} =require('../util/message');

const uuidV4 = require('uuid/v4');

function getCustomerList(callback) {
  CustomerModel.findAll({include: [{model: ConsumModal}]})
    .then(data => {
      callback && callback(Success(data));
    }).catch(error => callback && callback(Failure(error)));
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

const data = {
  number: '001232',
  name: '234',
  telephone: '234',
  conRight: '234',
  conLeft: '234',
  qjRight: '2342',
  qjLeft: '234',
  zjRight: '3423',
  zjLeft: '234',
  zwRight: '4234',
  zwLeft: '234',
  tj: '234',
  consumeDate: undefined
};
