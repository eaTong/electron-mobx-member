import React from 'react';
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';
import {Table, Input, Button} from 'antd';
import moment from 'moment';
import CustomerModal from './CustomerModal';

const Search = Input.Search;

const column = [
  {title: '会员号', dataIndex: 'number', key: 'number'},
  {title: '姓名', dataIndex: 'name', key: 'name'},
  {title: '电话', dataIndex: 'telephone', key: 'telephone'},
  {
    title: '消费次数', key: 'consumeCount', render: item => {
    return (item.tb_consum_lists || []).length + '次';
  }
  },
  {title: '累计积分', dataIndex: 'points', key: 'points'},
  {title: '剩余积分', dataIndex: 'rest_points', key: 'rest_points'},
];
const consumeListColumns = [
  {
    title: '左眼',
    children: [
      {dataIndex: 'qjLeft', title: '球镜', key: 'qjLeft'},
      {dataIndex: 'zjLeft', title: '柱镜', key: 'zjLeft'},
      {dataIndex: 'zwLeft', title: '轴位', key: 'zwLeft'},
      {dataIndex: 'conLeft', title: '隐形', key: 'conLeft'},
    ]
  },
  {
    title: '右眼',
    children: [
      {dataIndex: 'qjRight', title: '球镜', key: 'qjRight'},
      {dataIndex: 'zjRight', title: '柱镜', key: 'zjRight'},
      {dataIndex: 'zwRight', title: '轴位', key: 'zwRight'},
      {dataIndex: 'conRight', title: '隐形', key: 'conRight'},
    ]
  },
  {title: '瞳距', dataIndex: 'tj', key: 'tj'},
  {title: '消费金额', dataIndex: 'amount', key: 'amount'},
  {title: '消费日期', dataIndex: 'consumeDate', key: 'consumeDate', render: value => moment(value).format('YYYY-MM-DD')},
  {
    title: '其他信息', dataIndex: 'otherInfo', key: 'otherInfo'
  },
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

  expandedRowRender(row) {
    return <Table
      bordered
      dataSource={row.tb_consum_lists}
      columns={consumeListColumns}
      pagination={false}
      rowKey="id"/>
  }

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
              onSearch={customer.changeFilter}
            />
            <Button onClick={customer.toggleModal}>新增</Button>
          </div>
        </div>
        <div className="content">
          <Table dataSource={customer.customerList}
                 columns={column}
                 rowKey='id'
                 defaultExpandAllRows
                 expandedRowRender={(record) => record.tb_consum_lists.length > 0 ? this.expandedRowRender(record) : false}/>
        </div>
        <CustomerModal visible={customer.showModal}
                       toggleModal={customer.toggleModal}

                       onSave={this.onSaveCustomer}/>
      </div>
    );
  }
}

export default Customer;
