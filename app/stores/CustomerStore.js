/**
 * Created by eatong on 17-3-13.
 */
import {observable, action, computed, toJS, autorun} from 'mobx';
import {remote} from 'electron';
import {message} from 'antd';
const {customer} = remote.require('./app/services');

class Customer {
  @observable list = [];
  @observable showModal = false;
  @observable member = {};
  @observable filter = "";

  @action
  getCustomer = () => {
    customer.getCustomerList(result => {
      if (result.success) {
        this.list = result.data.map(item => item.toJSON());
      }
    });
  };

  @action
  addCustomer = (data) => {
    customer.addCustomer(data, result => {
      if (result.success) {
        this.getCustomer();
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
  changeFilter = (filter) => {
    console.log(filter);
    this.filter = filter;
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

  @computed
  get customerList() {
    return this.list.toJS().filter(cus => {
      return !this.filter || cus.telephone.indexOf(this.filter) !== -1 || cus.name.indexOf(this.filter) !== -1
    })
  }

  toJS() {
    return this.list.map(item => item.toJS());
  }

}

export default Customer;
