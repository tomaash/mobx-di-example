import { storesContext } from '../../interfaces'
import { observable } from 'mobx'

export class HomeStore {
  @observable username = 'tomaash'
  constructor(private mobxStores: storesContext) { }
}
