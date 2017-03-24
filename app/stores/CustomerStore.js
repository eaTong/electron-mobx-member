/**
 * Created by eatong on 17-3-13.
 */
import {observable, action, computed, toJS, autorun} from 'mobx';
import {remote} from 'electron';
import {message} from 'antd';
const {customer} = remote.require('./services');

class Customer {
  @observable list = [];
  @observable showModal = false;
  @observable member = {};

  @action
  getCustomer = () => {
    customer.getCustomerList(result => {
      if (result.success) {
        result.data.map(item => this.list.push(item.toJSON()));
      }
    });
  };

  @action
  addCustomer = (data) => {
    customer.addCustomer(data, result => {
      if (result.success) {
        this.list.push(result.data);
        this.showModal = false;
      } else {
        message.error(result.message);
      }
    });
  };

  @action
  toggleModal = () => {
    this.showModal = !this.showModal;
  };

  @action
  getCustomerByNumber = (data) => {
    customer.getCustomerByNumber(data, result => {
      if (result.success) {
        this.member = result.data;
      } else {
        message.error(result.message);
      }
    })
  };

  toJS() {
    return this.list.map(item => item.toJS());
  }

}

export default Customer;
