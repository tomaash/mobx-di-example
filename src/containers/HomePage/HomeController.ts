import { storesContext } from '../../interfaces'

export class HomeController {
  constructor(private mobxStores: storesContext) { }
  onUsernameChange = (e) => {
    this.mobxStores.homeStore.username = e.target.value
  }
  onSubmitForm = (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    this.mobxStores.appStore.loadRepos()
  }
}
