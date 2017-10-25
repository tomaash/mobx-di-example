import * as React from 'react';
import PropTypes from 'proptypes'
import { inject, observer, Provider } from 'mobx-react';
import { HomeController, HomeStore, HomePageComponent } from './'
import { AppStore } from '../App'

@inject('appStore', 'homeStore')
@observer
export class HomePage extends React.Component<{ appStore?: AppStore, homeStore?: HomeStore }, {}> {
  static contextTypes = {
    mobxStores: PropTypes.object
  }
  homeController = new HomeController(this.context.mobxStores)

  render() {
    return <Provider homeController={this.homeController}>
      <HomePageComponent />
    </Provider>
  }
}
