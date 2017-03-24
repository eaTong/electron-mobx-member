/**
 * Created by eatong on 17-3-22.
 */
import React, {PropTypes, Component} from 'react';
import {Menu} from 'antd';
import Customer from './customer/CustomerPage';

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

  }

  componentDidMount() {

  }

  renderContent() {
    switch (this.state.currentKey) {
      case 'member':
        return <Customer/>
    }
  }

  render() {
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
  }
}

Layout.propTypes = {};
export default Layout;
