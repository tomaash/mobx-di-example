import { storesContext } from '../../interfaces'
import { observable } from 'mobx'

export class UserStore {
  @observable username = 'tomaash'
  constructor(private mobxStores: storesContext) { }
}
