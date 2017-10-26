import * as React from 'react';
import PropTypes from 'proptypes'
import { Provider, inject, observer } from 'mobx-react';
import { observable, computed } from 'mobx'
import { AppStore, UserStore } from './'
import { HomePage } from '../HomePage'
import './App.css';

export class App extends React.Component {
  appStore = new AppStore(this)
  userStore = new UserStore(this)
  render() {
    return <Provider appStore={this.appStore} userStore={this.userStore}>
      <HomePage />
    </Provider>
  }
}
