/**
 * Created by eatong on 17-3-13.
 */
import React, {Component}from 'react';
import {HashRouter, Route, Link} from 'react-router-dom';
import {Provider} from 'mobx-react';

import MemberState from './stores/CustomerStore';
import AppStore from './stores/AppStore';

import Layout from './views/Layout';


const stores = {
  customer: new MemberState(),
  app: new AppStore()
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
