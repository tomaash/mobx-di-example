import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HomeController } from './'
import { AppStore, UserStore } from '../App'

type homePageProps = {
  appStore?: AppStore,
  userStore?: UserStore,
  homeController?: HomeController
}

@inject('appStore', 'userStore', 'homeController')
@observer
export class HomePageComponent extends React.Component<homePageProps, {}> {
  render() {
    const { homeController, appStore, userStore } = this.props
    return (
      <div className="App">
        <div className="App-intro">
          <h1>Try me!</h1>
          <form onSubmit={homeController.onSubmitForm}>
            Show Github repositories by @
            <input
              type="text"
              value={userStore.username}
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
