/**
 * Created by eatong on 17-3-13.
 */
import React, {Component}from 'react';
import {HashRouter, Route, Link} from 'react-router-dom';
import {Provider} from 'mobx-react';

import MemberState from './stores/CustomerStore';

import Layout from './views/Layout';


const stores = {
  customer: new MemberState()
};


export default  class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Layout/>
      </Provider>
    )
  }
}
