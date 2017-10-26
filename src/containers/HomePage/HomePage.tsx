import * as React from 'react';
import PropTypes from 'proptypes'
import { observer, Provider } from 'mobx-react';
import { HomeController, HomePageComponent } from './'

@observer
export class HomePage extends React.Component<{  }, {}> {
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
