import * as React from 'react';
import PropTypes from 'proptypes'
import { Provider, inject, observer } from 'mobx-react';
import { observable, computed } from 'mobx'
import { AppStore } from './'
import { HomeStore, HomePage } from '../HomePage'
import './App.css';

export class App extends React.Component {
  appStore = new AppStore(this)
  homeStore = new HomeStore(this)
  render() {
    return <Provider appStore={this.appStore} homeStore={this.homeStore}>
      <HomePage />
    </Provider>
  }
}
