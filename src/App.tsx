import * as React from 'react';
import PropTypes from 'proptypes'
import { Provider, inject, observer } from 'mobx-react';
import { observable, computed } from 'mobx'
import { request } from './request'
import './App.css';

type storesContext = {
  appStore: AppStore
  homeStore: HomeStore
}

export class AppStore {
  @observable loading = false
  @observable error = false
  @observable currentUser = null
  @observable userData = {
    repositories: null
  }
  constructor(private mobxStores: storesContext) {
    console.log(this.mobxStores)
  }

  @computed get repos() {
    return this.userData.repositories
  }

  private loadReposStart() {
    this.error = false
    this.loading = true
    this.userData.repositories = null
  }
  private loadReposSuccess(repos, username) {
    console.log(repos)
    this.userData.repositories = repos
    this.currentUser = username
    this.loading = false
  }
  private loadReposError(error) {
    this.error = error.message
    this.loading = false
  }

  loadRepos = async () => {
    this.loadReposStart()
    const { username } = this.mobxStores.homeStore
    const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
    try {
      const repos = await request(requestURL)
      this.loadReposSuccess(repos, username)
    } catch (err) {
      this.loadReposError(err)
    }
  }

}

export class HomeStore {
  @observable username = 'tomaash'
  constructor(private mobxStores: storesContext) {  }
}

export class LocalController {
  constructor(private mobxStores: storesContext) { }
  onUsernameChange = (e) => {
    this.mobxStores.homeStore.username = e.target.value
  }
  onSubmitForm = (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    this.mobxStores.appStore.loadRepos()
  }
}

export class AppTopWrapper extends React.Component {
  appStore = new AppStore(this)
  homeStore = new HomeStore(this)
  render() {
    return <Provider appStore={this.appStore} homeStore={this.homeStore}>
      <AppWrapper />
    </Provider>
  }
}

@inject('appStore', 'homeStore')
export class AppWrapper extends React.Component<{ appStore?: AppStore, homeStore?: HomeStore }, {}> {
  static contextTypes = {
    mobxStores: PropTypes.object
  }
  localController = new LocalController(this.context.mobxStores)

  render() {
    return <Provider localController={this.localController}>
      <App />
    </Provider>
  }
}

@inject('appStore', 'homeStore', 'localController')
@observer
export class App extends React.Component<{ appStore?: AppStore, homeStore?: HomeStore, localController?: LocalController }, {}> {

  render() {
    const { localController, appStore, homeStore } = this.props
    return (
      <div className="App">
        <div className="App-intro">
          <h1>Try me!</h1>
          <form onSubmit={localController.onSubmitForm}>
            Show Github repositories by @ <input value={homeStore.username} onChange={localController.onUsernameChange} type="text" />
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
