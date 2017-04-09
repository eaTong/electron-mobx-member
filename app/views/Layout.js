/**
 * Created by eatong on 17-3-22.
 */
import React, {PropTypes, Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Menu, Spin} from 'antd';
import Customer from './customer/CustomerPage';

@inject('app') @observer
class Layout extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentKey: 'member',
  };
  handleClick = (e) => {
    this.setState({
      currentKey: e.key,
    });
  };

  componentWillMount() {
    this.props.app.checkConnection();
  }

  renderContent() {
    switch (this.state.currentKey) {
      case 'member':
        return <Customer/>
    }
  }

  render() {
    if (this.props.app.checkingDB) {
      return (
        <div className="db-error">
          <Spin/>
          正在加载...
        </div>
      )
    }
    if (this.props.app.dbConnected) {
      return (
        <div className="">
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.currentKey]}
            mode="horizontal">
            <Menu.Item key="member">
              会员管理
            </Menu.Item>
          </Menu>
          {this.renderContent()}
        </div>
      );
    } else {
      return (
        <div className="db-error">
          db setting form
        </div>
      )
    }
  }
}

Layout.propTypes = {};
export default Layout;
