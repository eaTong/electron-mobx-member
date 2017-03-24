import React from 'react';
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';
import {Table, Input, Button} from 'antd';
import CustomerModal from './CustomerModal';
const Search = Input.Search;

const column = [
  {title: '会员号', dataIndex: 'number', key: 'number'},
  {title: '姓名', dataIndex: 'name', key: 'name'},
  {title: '电话', dataIndex: 'telephone', key: 'telephone'},
  {
    title: '消费次数', key: 'consumeCount', render: item => {
    console.log(item);
    return (item.tb_consum_lists || []).length + '次';
  }
  },
  {title: '累计积分', dataIndex: 'points', key: 'points'},
  {title: '剩余积分', dataIndex: 'rest_points', key: 'rest_points'},
];
@inject('customer') @observer
class Customer extends React.Component {
  componentWillMount() {
    const {customer} = this.props;
    customer.getCustomer()
  }

  onSaveCustomer = (data) => {
    this.props.customer.addCustomer(data);
  };

  render() {
    const {customer} = this.props;
    return (
      <div className="mm-layout">
        <div className="title">
          <span>会员管理</span>
          <div className="toolbar">
            <Search
              placeholder="搜索会员"
              style={{width: 200}}
              onSearch={value => console.log(value)}
            />
            <Button onClick={customer.toggleModal}>新增</Button>
          </div>
        </div>
        <div className="content">
          <Table dataSource={customer.list.toJS()} columns={column} rowKey='id'/>
        </div>
        <CustomerModal visible={customer.showModal}
                       toggleModal={customer.toggleModal}
                       onSave={this.onSaveCustomer}/>
      </div>
    );
  }
}
export default Customer;
