/**
 * Created by eatong on 17-3-13.
 */
import {observable, action, computed, toJS, autorun} from 'mobx';
import {remote} from 'electron';
import {message} from 'antd';

const {customer} = remote.require('./app/services');

export default class CustomerStore {
  @observable list = [];
  @observable total = 0;
  @observable pageIndex = 0;
  @observable showModal = false;
  @observable member = {};
  @observable filter = "";

  @action
  paginate(pageIndex){
    this.pageIndex = pageIndex-1;
    this.getCustomer();
  }

  @action
  getCustomer = () => {
    customer.getCustomerList({keywords: this.filter, pageIndex: this.pageIndex, pageSize: 20}, result => {
      if (result.success) {
        console.log(result);
        // this.list = result.data.map(item => item.toJSON());
        const {list, total} = result.data;
        console.log(list , total);
        this.list = list;
        this.total = total;
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
    this.filter = filter;
    this.getCustomer();
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

}

