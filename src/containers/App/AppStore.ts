import * as React from 'react';
import { observable, computed } from 'mobx'
import { request } from '../../utils/request'
import { storesContext } from '../../interfaces'

export class AppStore {
  @observable loading = false
  @observable error = null
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

  private loadReposStart() {
    this.error = false
    this.loading = true
    this.userData.repositories = null
  }

  private loadReposSuccess(repos: Array<any>, username: string) {
    this.userData.repositories = repos
    this.currentUser = username
    this.loading = false
  }

  private loadReposError(error: Error) {
    this.error = error.message
    this.loading = false
  }
}
