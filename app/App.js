/**
 * Created by eatong on 17-3-13.
 */
import React, {Component}from 'react';
import {Provider} from 'mobx-react';
import CustomerStore from './stores/CustomerStore';
import Layout from './views/Layout';


const stores = {
  customer: new CustomerStore()
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
