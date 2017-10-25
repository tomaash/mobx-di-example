import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HomeController, HomeStore } from './'
import { AppStore } from '../App'

type homePageProps = {
  appStore?: AppStore,
  homeStore?: HomeStore,
  homeController?: HomeController
}

@inject('appStore', 'homeStore', 'homeController')
@observer
export class HomePageComponent extends React.Component<homePageProps, {}> {
  render() {
    const { homeController, appStore, homeStore } = this.props
    return (
      <div className="App">
        <div className="App-intro">
          <h1>Try me!</h1>
          <form onSubmit={homeController.onSubmitForm}>
            Show Github repositories by @
            <input
              type="text"
              value={homeStore.username}
              onChange={homeController.onUsernameChange} />
          </form>
        </div>
        {appStore.loading && <div>SPINNER</div>}
        {appStore.repos && <div>
          {appStore.repos.map((x) => <div key={x.name}>{x.name}</div>)}
        </div>}
        {appStore.error}
      </div>
    );
  }
}
